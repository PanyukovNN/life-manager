package org.panyukovnn.lifemanager.controller;

import org.panyukovnn.lifemanager.model.Category;
import org.panyukovnn.lifemanager.model.Task;
import org.panyukovnn.lifemanager.model.TaskCompareType;
import org.panyukovnn.lifemanager.model.TaskStatus;
import org.panyukovnn.lifemanager.model.dto.TaskDto;
import org.panyukovnn.lifemanager.model.request.CreateUpdateTaskRequest;
import org.panyukovnn.lifemanager.model.request.DeleteByIdRequest;
import org.panyukovnn.lifemanager.model.request.FindTaskListRequest;
import org.panyukovnn.lifemanager.service.CategoryService;
import org.panyukovnn.lifemanager.service.ControllerHelper;
import org.panyukovnn.lifemanager.service.TaskService;
import org.panyukovnn.lifemanager.service.periodstrategy.PeriodStrategyResolver;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.Collections;
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
    private final PeriodStrategyResolver periodStrategyResolver;

    /**
     * Конструктор
     *
     * @param taskService сервис задач
     * @param categoryService сервис категорий
     * @param periodStrategyResolver менеджер стратегий определения периода
     */
    public TaskController(TaskService taskService,
                          CategoryService categoryService,
                          PeriodStrategyResolver periodStrategyResolver) {
        this.taskService = taskService;
        this.categoryService = categoryService;
        this.periodStrategyResolver = periodStrategyResolver;
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

        //TODO искать сразу все категории (либо из кеша)
        List<Category> categories = Collections.emptyList();
        if (!CollectionUtils.isEmpty(request.getCategories())) {
            categories = request.getCategories()
                    .stream()
                    .map(categoryService::findByName)
                    .collect(Collectors.toList());
        }

        LocalDate startDate = LocalDate.now();
        LocalDate endDate = periodStrategyResolver.resolve(request.getPeriodType())
                .getEndDate(startDate);

        List<Task> tasks = taskService.findList(
                request.getPriority(),
                request.getTaskStatuses(),
                categories,
                startDate,
                endDate,
                request.getCompareType());
        return tasks
                .stream()
                .map(TaskDto::new)
                .collect(Collectors.toList());
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
     * @return сообщение об успешном удалении
     */
    @DeleteMapping("/delete-by-id")
    public String deleteById(@RequestBody @Valid DeleteByIdRequest request) {
        Objects.requireNonNull(request);

        taskService.deleteById(request.getId());

        return String.format(TASK_REMOVED_SUCCESSFULLY, request.getId());
    }

    @ExceptionHandler(value = {Exception.class})
    public void handleException(Exception e) {
        e.printStackTrace();
    }
}
