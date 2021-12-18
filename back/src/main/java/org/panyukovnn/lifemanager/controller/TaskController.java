package org.panyukovnn.lifemanager.controller;

import org.panyukovnn.lifemanager.controller.serviceadapter.TaskServiceControllerAdapter;
import org.panyukovnn.lifemanager.model.dto.TaskDto;
import org.panyukovnn.lifemanager.model.request.*;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

import static org.panyukovnn.lifemanager.model.Constants.TASKS_CREATED_UPDATED_SUCCESSFULLY;

/**
 * Контроллер задач
 */
@CrossOrigin
@RestController
@RequestMapping("/task")
public class TaskController {

    private final TaskServiceControllerAdapter taskServiceAdapter;

    /**
     * Конструктор
     *
     * @param taskServiceAdapter адаптер сервиса задач
     */
    public TaskController(TaskServiceControllerAdapter taskServiceAdapter) {
        this.taskServiceAdapter = taskServiceAdapter;
    }

    /**
     * Создать/обновить задачу
     *
     * @param request запрос
     * @return сообщение об успешном сохранении/обновлении задачи
     */
    @PostMapping("/create-update")
    public String createUpdateTask(@RequestBody @Valid CreateUpdateTaskRequest request) {
        taskServiceAdapter.createUpdate(request);

        return TASKS_CREATED_UPDATED_SUCCESSFULLY;
    }

    /**
     * Вернуть список задач по заданным параметрам
     *
     * @param request запрос
     * @return список задач
     */
    @PostMapping("/find-list")
    public List<TaskDto> findTaskList(@RequestBody @Valid FindTaskListRequest request) {
        return taskServiceAdapter.findTaskList(request);
    }

    /**
     * Изменить статус задач
     *
     * @param request запрос
     * @return сообщение о результате
     */
    @PostMapping("/set-status")
    public String setStatus(@RequestBody @Valid SetStatusRequest request) {
        return taskServiceAdapter.setStatus(request);
    }

    /**
     * Вернуть все задачи
     *
     * @return список задач
     */
    @GetMapping("/find-all")
    public List<TaskDto> findAll() {
        return taskServiceAdapter.findAll();
    }

    /**
     * Удалить задачу по идентификатору
     *
     * @param request запрос
     * @return сообщение о результате
     */
    @DeleteMapping("/delete-by-id")
    public String deleteById(@RequestBody @Valid DeleteByIdRequest request) {
        return taskServiceAdapter.deleteById(request);
    }

    /**
     * Удалить задачи по списку идентификаторов
     *
     * @param request запрос
     * @return сообщение о результате
     */
    @DeleteMapping("/delete-by-ids")
    public String deleteByIds(@RequestBody @Valid DeleteByIdsRequest request) {
        return taskServiceAdapter.deleteByIds(request);
    }
}
