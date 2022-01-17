package org.panyukovnn.lifemanager.controller;

import lombok.RequiredArgsConstructor;
import org.panyukovnn.lifemanager.controller.serviceadapter.TaskListParams;
import org.panyukovnn.lifemanager.exception.NotFoundException;
import org.panyukovnn.lifemanager.model.Category;
import org.panyukovnn.lifemanager.model.Task;
import org.panyukovnn.lifemanager.model.TaskSortType;
import org.panyukovnn.lifemanager.model.dto.TaskDto;
import org.panyukovnn.lifemanager.model.request.*;
import org.panyukovnn.lifemanager.service.CategoryService;
import org.panyukovnn.lifemanager.service.TaskService;
import org.panyukovnn.lifemanager.service.periodstrategy.PeriodStrategyResolver;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
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
    private final PeriodStrategyResolver periodStrategyResolver;

    /**
     * Создать/обновить задачу.
     *
     * @param request запрос
     * @param timeZone часовой пояс клиента
     * @return сообщение об успешном сохранении/обновлении задачи
     */
    @PostMapping("/create-update")
    public String createUpdateTask(@RequestBody @Valid CreateUpdateTaskRequest request, TimeZone timeZone) {
        Category category = categoryService.findByName(request.getCategory())
                .orElseThrow(() -> new NotFoundException(NO_CATEGORY_FOR_TASK_ERROR_MSG));
        String description = request.getDescription().trim();

        Task task = new Task();
        task.setId(request.getId());
        task.setPriority(request.getPriority());
        task.setDescription(description);
        task.setStatus(request.getStatus());
        task.setCategoryName(category.getName());
        task.setPlannedDate(request.getPlannedDate());
        task.setPlannedTime(request.getPlannedTime());

        taskService.createUpdate(task, timeZone);

        return TASKS_CREATED_UPDATED_SUCCESSFULLY;
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
        LocalDate startDate = LocalDate.now(timeZone.toZoneId());
        LocalDate endDate = periodStrategyResolver.resolve(request.getPeriodType())
                .getEndDate(startDate);

        TaskListParams params = TaskListParams.builder()
                .priority(request.getPriority())
                .statuses(request.getTaskStatuses())
                .categories(request.getCategories())
                .startDate(null) // мы хотим показывать просроченные задачи
                .endDate(endDate)
                .sortType(request.getSortType())
                .build();

        return taskService.findList(params)
                .stream()
                .map(task -> taskService.convertToDto(task, timeZone))
                .collect(Collectors.toList());
    }

    /**
     * Изменить статус задач.
     *
     * @param request запрос
     * @return сообщение о результате
     */
    @PostMapping("/set-status")
    public String setStatus(@RequestBody @Valid SetStatusRequest request) {
        taskService.setStatus(request.getIds(), request.status);

        return String.format(STATUS_SET_SUCCESSFULLY, request.getStatus(), request.getIds());
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
    public String deleteById(@RequestBody @Valid DeleteByIdRequest request) {
        taskService.deleteById(request.getId());

        return String.format(TASK_REMOVED_SUCCESSFULLY, request.getId());
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

        return TASKS_REMOVED_SUCCESSFULLY;
    }
}
