package org.panyukovnn.lifemanager.controller;

import org.panyukovnn.lifemanager.model.Category;
import org.panyukovnn.lifemanager.model.Task;
import org.panyukovnn.lifemanager.model.TaskCompareType;
import org.panyukovnn.lifemanager.model.TaskStatus;
import org.panyukovnn.lifemanager.model.dto.TaskDto;
import org.panyukovnn.lifemanager.model.request.*;
import org.panyukovnn.lifemanager.service.CategoryService;
import org.panyukovnn.lifemanager.service.ControllerHelper;
import org.panyukovnn.lifemanager.service.TaskService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static org.panyukovnn.lifemanager.model.Constants.*;

/**
 * Контроллер задач
 */
@CrossOrigin
@RestController
@RequestMapping("/task")
public class TaskController {

    private final TaskService taskService;
    private final CategoryService categoryService;

    /**
     * Конструктор
     *
     * @param taskService сервис задач
     * @param categoryService сервис категорий
     */
    public TaskController(TaskService taskService,
                          CategoryService categoryService) {
        this.taskService = taskService;
        this.categoryService = categoryService;
    }

    /**
     * Создать/обновить задачу
     *
     * @param request запрос
     * @return созданная/обновленная задача
     */
    @PostMapping("/create-update")
    public TaskDto createUpdateTask(@RequestBody @Valid CreateUpdateTaskRequest request) {
        Objects.requireNonNull(request, NULL_CREATE_UPDATE_TASK_REQUEST_ERROR_MSG);

        int priority = ControllerHelper.paramToPriority(request.getPriority());
        TaskStatus status = TaskStatus.valueOf(request.getStatus());
        Category category = categoryService.findByName(request.getCategory());

        Task task = taskService.createUpdate(
                request.getId(),
                priority,
                request.getDescription(),
                category,
                status,
                request.getCompletionDate(),
                request.getCompletionTime());

        return new TaskDto(task);
    }

    /**
     * Вернуть список задач по заданным параметрам
     *
     * @param request запрос
     * @return список задач
     */
    @PostMapping("/find-list")
    public List<TaskDto> findTaskList(@RequestBody @Valid FindTaskListRequest request) {
        Objects.requireNonNull(request, NULL_FIND_LIST_REQUEST_ERROR_MSG);

        TaskService.TaskListParams params = taskService.findListRequestToParams(request);

        return taskService.findList(params)
                .stream()
                .map(TaskDto::new)
                .collect(Collectors.toList());
    }

    /**
     * Изменить статус задач
     *
     * @param request запрос
     * @return сообщение о результате
     */
    @PostMapping("/set-status")
    public String setStatus(@RequestBody @Valid SetStatusRequest request) {
        Objects.requireNonNull(request, NULL_FIND_LIST_REQUEST_ERROR_MSG);

        taskService.setStatus(request.getIds(), request.status);

        return String.format(STATUS_SET_SUCCESSFULLY, request.getStatus(), request.getIds());
    }

    /**
     * Вернуть все задачи
     *
     * @return список задач
     */
    @GetMapping("/find-all")
    public List<TaskDto> findAll() {
        return taskService.findAll(TaskCompareType.PRIORITY_FIRST)
                .stream()
                .map(TaskDto::new)
                .collect(Collectors.toList());
    }

    /**
     * Удалить задачу по идентификатору
     *
     * @param request запрос
     * @return сообщение о результате
     */
    @DeleteMapping("/delete-by-id")
    public String deleteById(@RequestBody @Valid DeleteByIdRequest request) {
        Objects.requireNonNull(request);

        taskService.deleteById(request.getId());

        return String.format(TASK_REMOVED_SUCCESSFULLY, request.getId());
    }

    /**
     * Удалить задачи по списку идентификаторов
     *
     * @param request запрос
     * @return сообщение о результате
     */
    @DeleteMapping("/delete-by-ids")
    public String deleteByIds(@RequestBody @Valid DeleteByIdsRequest request) {
        Objects.requireNonNull(request);

        taskService.deleteByIds(request.getIds());

        return String.format(TASK_REMOVED_SUCCESSFULLY, request.getIds());
    }

    @ExceptionHandler(value = {Exception.class})
    public void handleException(Exception e) {
        e.printStackTrace();
    }
}
