package org.panyukovnn.lifemanager.controller.serviceadapter;

import org.panyukovnn.lifemanager.exception.NotFoundException;
import org.panyukovnn.lifemanager.model.Category;
import org.panyukovnn.lifemanager.model.Task;
import org.panyukovnn.lifemanager.model.TaskCompareType;
import org.panyukovnn.lifemanager.model.dto.TaskDto;
import org.panyukovnn.lifemanager.model.request.*;
import org.panyukovnn.lifemanager.service.CategoryService;
import org.panyukovnn.lifemanager.service.ControllerHelper;
import org.panyukovnn.lifemanager.service.TaskService;
import org.panyukovnn.lifemanager.service.periodstrategy.PeriodStrategyResolver;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.TimeZone;
import java.util.stream.Collectors;

import static org.panyukovnn.lifemanager.model.Constants.*;

/**
 * Адаптер {@link TaskService} для взаимодействия с {@link org.panyukovnn.lifemanager.controller.TaskController}
 */
@Service
public class TaskServiceControllerAdapter {

    private final TaskService taskService;
    private final CategoryService categoryService;
    private final PeriodStrategyResolver periodStrategyResolver;

    /**
     * Конструктор
     *
     * @param taskService сервис задач
     * @param categoryService сервис категорий
     * @param periodStrategyResolver periodStrategyResolver
     */
    public TaskServiceControllerAdapter(TaskService taskService,
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
     * @param timeZone часовой пояс клиента
     * @return транспортный объект созданной/обновленной задачи
     */
    public TaskDto createUpdate(CreateUpdateTaskRequest request, TimeZone timeZone) {
        int priority = ControllerHelper.paramToPriority(request.getPriority());
        Category category = categoryService.findByName(request.getCategory())
                .orElseThrow(() -> new NotFoundException(NO_CATEGORY_FOR_TASK_ERROR_MSG));
        String description = request.getDescription().trim();

        LocalDateTime creationDateTime = LocalDateTime.now(timeZone.toZoneId());

        Task task = taskService.createUpdate(
                request.getId(),
                priority,
                description,
                category.getName(),
                request.getStatus(),
                creationDateTime,
                request.getPlannedDate(),
                request.getPlannedTime());

        return taskService.convertToDto(task, timeZone);
    }

    /**
     * Найти список задач по указанным параметрам
     *
     * @param request запрос
     * @param timeZone часовой пояс клиента
     * @return список транспортных объектов задач
     */
    public List<TaskDto> findTaskList(FindTaskListRequest request, TimeZone timeZone) {
        LocalDate startDate = LocalDate.now(timeZone.toZoneId());
        LocalDate endDate = periodStrategyResolver.resolve(request.getPeriodType())
                .getEndDate(startDate);
        List<Integer> priorityRange = ControllerHelper.letterToPriorityRange(request.getPriorityLetter());

        TaskListParams params = TaskListParams.builder()
                .priorityRange(priorityRange)
                .statuses(request.getTaskStatuses())
                .categories(request.getCategories())
                .startDate(null) // мы хотим показывать просроченные задачи
                .endDate(endDate)
                .compareType(request.getCompareType())
                .build();

        return taskService.findList(params)
                .stream()
                .map(task -> taskService.convertToDto(task, timeZone))
                .collect(Collectors.toList());
    }

    /**
     * Изменить статус задач
     *
     * @param request запрос
     * @return сообщение о результате
     */
    public String setStatus(@RequestBody @Valid SetStatusRequest request) {
        taskService.setStatus(request.getIds(), request.status);

        return String.format(STATUS_SET_SUCCESSFULLY, request.getStatus(), request.getIds());
    }

    /**
     * Вернуть все задачи
     *
     * @param timeZone часовой пояс клиента
     * @return список задач
     */
    public List<TaskDto> findAll(TimeZone timeZone) {
        return taskService.findAll(TaskCompareType.PRIORITY_FIRST)
                .stream()
                .map(task -> taskService.convertToDto(task, timeZone))
                .collect(Collectors.toList());
    }

    /**
     * Удалить задачу по идентификатору
     *
     * @param request запрос
     * @return сообщение о результате
     */
    public String deleteById(DeleteByIdRequest request) {
        taskService.deleteById(request.getId());

        return String.format(TASK_REMOVED_SUCCESSFULLY, request.getId());
    }

    /**
     * Удалить задачи по списку идентификаторов
     *
     * @param request запрос
     * @return сообщение о результате
     */
    public String deleteByIds(DeleteByIdsRequest request) {
        taskService.deleteByIds(request.getIds());

        return TASKS_REMOVED_SUCCESSFULLY;
    }
}
