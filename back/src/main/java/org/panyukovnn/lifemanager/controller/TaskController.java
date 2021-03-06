package org.panyukovnn.lifemanager.controller;

import lombok.RequiredArgsConstructor;
import org.panyukovnn.lifemanager.controller.serviceadapter.TaskListParams;
import org.panyukovnn.lifemanager.exception.NotFoundException;
import org.panyukovnn.lifemanager.model.Category;
import org.panyukovnn.lifemanager.model.Task;
import org.panyukovnn.lifemanager.model.TaskSortType;
import org.panyukovnn.lifemanager.model.TaskStatus;
import org.panyukovnn.lifemanager.model.dto.TaskDto;
import org.panyukovnn.lifemanager.model.request.*;
import org.panyukovnn.lifemanager.service.CategoryService;
import org.panyukovnn.lifemanager.service.TaskService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;

import static org.panyukovnn.lifemanager.model.Constants.*;

/**
 * Контроллер задач.
 */
@CrossOrigin
@RestController
@RequestMapping("/task")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;
    private final CategoryService categoryService;

    /**
     * Создать/обновить задачу.
     *
     * @param request запрос
     * @param timeZone часовой пояс клиента
     * @return созданная/обновленная задача
     */
    @PostMapping("/create-update")
    public TaskDto createUpdateTask(@RequestBody @Valid CreateUpdateTaskRequest request, TimeZone timeZone) {
        Category category = categoryService.findByName(request.getCategoryName())
                .orElseThrow(() -> new NotFoundException(NO_CATEGORY_FOR_TASK_ERROR_MSG));
        String description = request.getDescription().trim();

        Task task = new Task();
        task.setId(request.getId());
        task.setPriority(request.getPriority());
        task.setDescription(description);
        task.setStatus(request.getStatus());
        task.setCategory(category);
        task.setPlannedDate(request.getPlannedDate());
        task.setPlannedTime(request.getPlannedTime());

        Task createdUpdatedTask = taskService.createUpdate(task, timeZone);

        return taskService.convertToDto(createdUpdatedTask, timeZone);
    }

    /**
     * Вернуть карту, где задачи сгруппированы по приоритету.
     * В качестве ключа выступает буква приоритета.
     *
     * @param request запрос
     * @param timeZone часовой пояс клиента
     * @return карта задач
     */
    @PostMapping("/find-priority-task-list-map")
    public Map<Character, List<TaskDto>> findPriorityTaskListMap(@RequestBody @Valid FindTaskListRequest request, TimeZone timeZone) {
        List<TaskDto> taskList = findTaskList(request, timeZone);

        TreeMap<Character, List<TaskDto>> priorityTaskListMap = taskList.stream().collect(Collectors.groupingBy(
                taskDto -> taskDto.getPriority().charAt(0),
                TreeMap::new,
                Collectors.toList()
        ));

        // Если по какому-либо из имеющихся приоритетов нет задач, то добавляем пустой список в ответ
        PRIORITIES.forEach(priority -> {
            if (!priorityTaskListMap.containsKey(priority)) {
                priorityTaskListMap.put(priority, new ArrayList<>());
            }
        });

        return priorityTaskListMap;
    }

    /**
     * Вернуть список задач по заданным параметрам.
     *
     * @param request запрос
     * @param timeZone часовой пояс клиента
     * @return список задач
     */
    @PostMapping("/find-list")
    public List<TaskDto> findTaskList(@RequestBody @Valid FindTaskListRequest request, TimeZone timeZone) {
                List<Category> categories = categoryService.findByNameIn(request.getCategoryNames());
        List<Long> categoryIds = categories
                .stream()
                .map(Category::getId)
                .collect(Collectors.toList());

        TaskListParams params = TaskListParams.builder()
                .priority(request.getPriority())
                .statuses(request.getTaskStatuses())
                .categoryIds(categoryIds)
                .doneDatePeriod(request.getDoneDatePeriod())
                .sortType(request.getSortType())
                .build();

        return taskService.findList(params)
                .stream()
                .map(task -> taskService.convertToDto(task, timeZone))
                .collect(Collectors.toList());
    }

    /**
     * Изменить статус задачи.
     *
     * @param request запрос
     * @param timeZone часовой пояс клиента
     * @return сообщение о результате
     */
    @PostMapping("/set-status")
    public String setStatus(@RequestBody @Valid SetStatusRequest request, TimeZone timeZone) {
        taskService.setStatus(request.getId(), request.getStatus(), timeZone);

        if (request.getStatus() == TaskStatus.DONE) {
            return DONE_STATUS_SET_SUCCESSFULLY;
        } else if (request.getStatus() == TaskStatus.TO_DO) {
            return TO_DO_STATUS_SET_SUCCESSFULLY;
        } else {
            return String.format(STATUS_SET_SUCCESSFULLY, request.getStatus());
        }
    }

    /**
     * Вернуть все задачи.
     *
     * @param timeZone часовой пояс клиента
     * @return список задач
     */
    @GetMapping("/find-all")
    public List<TaskDto> findAll(TimeZone timeZone) {
        return taskService.findAll(TaskSortType.PRIORITY_FIRST)
                .stream()
                .map(task -> taskService.convertToDto(task, timeZone))
                .collect(Collectors.toList());
    }

    /**
     * Удалить задачу по идентификатору.
     *
     * @param request запрос
     * @return сообщение о результате
     */
    @DeleteMapping("/delete-by-id")
    public String deleteById(@RequestBody @Valid IdRequest request) {
        taskService.deleteById(request.getId());

        return TASK_REMOVED_SUCCESSFULLY;
    }

    /**
     * Удалить задачи по списку идентификаторов.
     *
     * @param request запрос
     * @return сообщение о результате
     */
    @DeleteMapping("/delete-by-ids")
    public String deleteByIds(@RequestBody @Valid DeleteByIdsRequest request) {
        taskService.deleteByIds(request.getIds());

        return request.getIds().size() > 1
                ? TASKS_REMOVED_SUCCESSFULLY
                : TASK_REMOVED_SUCCESSFULLY;
    }
}
