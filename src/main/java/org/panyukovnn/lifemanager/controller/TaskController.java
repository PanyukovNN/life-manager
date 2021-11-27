package org.panyukovnn.lifemanager.controller;

import org.panyukovnn.lifemanager.model.Task;
import org.panyukovnn.lifemanager.model.request.CreateUpdateTaskRequest;
import org.panyukovnn.lifemanager.model.request.FindTaskListRequest;
import org.panyukovnn.lifemanager.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

import static org.panyukovnn.lifemanager.model.Constants.*;

/**
 * Контроллер задач
 */
@RestController
@RequestMapping("/task")
public class TaskController {

    private final TaskService taskService;

    /**
     * Конструктор
     *
     * @param taskService сервис задач
     */
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    /**
     * Создать/обновить задачу
     *
     * @param request запрос
     * @return созданная/обновленная задача
     */
    @PostMapping("/create-update")
    public Task createUpdateTask(@RequestBody CreateUpdateTaskRequest request) {
        Objects.requireNonNull(request, NULL_CREATE_UPDATE_TASK_REQUEST_ERROR_MSG);

        return taskService.createUpdate(
                request.getId(),
                request.getPriority(),
                request.getDescription(),
                request.getStatus(),
                request.getCompletionDateTime());
    }

    /**
     * Вернуть список задач по заданным параметрам
     *
     * @param request запрос
     * @return список задач
     */
    @GetMapping("/list")
    public List<Task> findTaskList(@RequestBody FindTaskListRequest request) {
        Objects.requireNonNull(request, NULL_FIND_LIST_REQUEST_ERROR_MSG);

        return taskService.findList(
                request.getPriority(),
                request.getTaskStatuses(),
                request.getCategories(), //TODO переделать String на Category
                request.getStartDate(),
                request.getEndDate(),
                request.getCompareType());
    }

    /**
     * Вернуть все задачи
     *
     * @return список задач
     */
    @GetMapping("/find-all")
    public List<Task> findAll() {
        List<Task> allTasks = taskService.findAll();
        allTasks.sort(Collections.reverseOrder());

        return allTasks;
    }

    /**
     * Обработчик ошибок
     *
     * @param e исключение
     * @return сообщение об ошибке
     */
    @ExceptionHandler(Exception.class)
    public String handleException(Exception e) {
        e.printStackTrace();

        return ERROR_OCCURRED_MSG + e.getMessage();
    }
}
