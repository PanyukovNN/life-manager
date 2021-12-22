package org.panyukovnn.lifemanager.service;

import io.micrometer.core.instrument.util.StringUtils;
import org.panyukovnn.lifemanager.controller.serviceadapter.TaskListParams;
import org.panyukovnn.lifemanager.model.Task;
import org.panyukovnn.lifemanager.model.TaskCompareType;
import org.panyukovnn.lifemanager.model.TaskStatus;
import org.panyukovnn.lifemanager.model.dto.TaskDto;
import org.panyukovnn.lifemanager.repository.TaskRepository;
import org.panyukovnn.lifemanager.service.taskcomparestrategy.TaskCompareStrategyResolver;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.TimeZone;

import static org.panyukovnn.lifemanager.model.Constants.*;
import static org.panyukovnn.lifemanager.service.ControllerHelper.FRONT_D_FORMATTER;
import static org.panyukovnn.lifemanager.service.ControllerHelper.FRONT_T_FORMATTER;

/**
 * Сервис задач
 */
@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final MongoTemplate mongoTemplate;
    private final TaskCompareStrategyResolver compareStrategyResolver;

    /**
     * Конструктор
     *
     * @param taskRepository репозиторий задач
     * @param mongoTemplate операции для работы с монго запросами
     * @param compareStrategyResolver менеджер стратегий сортировки задач
     */
    public TaskService(TaskRepository taskRepository,
                       MongoTemplate mongoTemplate,
                       TaskCompareStrategyResolver compareStrategyResolver) {
        this.taskRepository = taskRepository;
        this.mongoTemplate = mongoTemplate;
        this.compareStrategyResolver = compareStrategyResolver;
    }

    /**
     * Создать/обновить задачу
     *
     * @param rawTask задача, сформированная из запроса
     * @param timeZone часовой пояс клиента
     * @return созданная/обновленная задача
     */
    public Task createUpdate(Task rawTask, TimeZone timeZone) {
        boolean notBlankId = StringUtils.isNotBlank(rawTask.getId());
        boolean wrongTaskId = notBlankId
                && !taskRepository.existsById(rawTask.getId());

        if (wrongTaskId) {
            throw new IllegalArgumentException(WRONG_TASK_ID_ERROR_MSG);
        }

        if (notBlankId && rawTask.getCreationDateTime() == null) {
            LocalDateTime creationDateTime = LocalDateTime.now(timeZone.toZoneId());
            rawTask.setCreationDateTime(creationDateTime);
        }

        return taskRepository.save(rawTask);
    }

    /**
     * Поиск задач по набору параметров
     * Если какой либо из параметров равен null, то он не учитывается
     *
     * @param params параметры поиска задач
     * @return список задач
     */
    public List<Task> findList(TaskListParams params) {
        Query query = new Query();
        List<Criteria> criteriaList = new ArrayList<>();

        if (!CollectionUtils.isEmpty(params.getPriorityRange())) {
            criteriaList.add(Criteria.where(PRIORITY).in(params.getPriorityRange()));
        }

        if (!CollectionUtils.isEmpty(params.getStatuses())) {
            criteriaList.add(Criteria.where(STATUS).in(params.getStatuses()));
        }

        if (!CollectionUtils.isEmpty(params.getCategories())) {
            criteriaList.add(Criteria.where(CATEGORY_NAME).in(params.getCategories()));
        }

        if (params.getStartDate() != null) {
            criteriaList.add(new Criteria().orOperator(
                    Criteria.where(PLANNED_DATE).is(null),
                    Criteria.where(PLANNED_DATE).gte(params.getStartDate())
            ));
        }

        if (params.getEndDate() != null && params.getEndDate() != LocalDate.MAX) {
            criteriaList.add(new Criteria().orOperator(
                    Criteria.where(PLANNED_DATE).is(null),
                    Criteria.where(PLANNED_DATE).lte(params.getEndDate())
            ));
        }

        if (!criteriaList.isEmpty()) {
            query.addCriteria(new Criteria().andOperator(criteriaList.toArray(new Criteria[0])));
        }

        List<Task> tasks = mongoTemplate.find(query, Task.class);
        tasks.sort(compareStrategyResolver.resolve(params.getCompareType()));

        return tasks;
    }

    /**
     * Изменяет статус задач
     *
     * @param ids список идентификаторов задач
     * @param status статус
     */
    @Transactional
    public void setStatus(List<String> ids, TaskStatus status) {
        List<Task> tasks = taskRepository.findByIdIn(ids);

        tasks.forEach(task -> task.setStatus(status));

        taskRepository.saveAll(tasks);
    }

    /**
     * Вернуть все задачи, отсортированные сначала по приоритету, затем по дате
     *
     * @param compareType способ сортировки задач
     * @return список задач
     */
    public List<Task> findAll(TaskCompareType compareType) {
        List<Task> allTasks = taskRepository.findAll();
        allTasks.sort(compareStrategyResolver.resolve(compareType));

        return allTasks;
    }

    /**
     * Удалить задачу по идентификатору
     *
     * @param id идентификатор
     */
    public void deleteById(String id) {
        taskRepository.deleteById(id);
    }

    /**
     * Удалить задачи по списку идентификаторов
     *
     * @param ids список идентификаторов
     */
    public void deleteByIds(List<String> ids) {
        taskRepository.deleteAllById(ids);
    }

    /**
     * Конвертировать задачу в транспортный объект
     *
     * @param task задача
     * @param timeZone часовой пояс клиента
     * @return транспортный объект задачи
     */
    public TaskDto convertToDto(Task task, TimeZone timeZone) {
        Objects.requireNonNull(task, NULL_TASK_ERROR_MSG);
        Objects.requireNonNull(task.getCategoryName(), NULL_CATEGORY_NAME_ERROR_MSG);

        String priority = ControllerHelper.priorityToParam(task.getPriority());
        String categoryName = task.getCategoryName();

        TaskDto.TaskDtoBuilder builder = TaskDto.builder()
                .id(task.getId())
                .description(task.getDescription())
                .priority(priority)
                .category(categoryName)
                .status(task.getStatus().name());

        if (task.getPlannedDate() != null) {
            builder.plannedDate(FRONT_D_FORMATTER.format(task.getPlannedDate()));

            if (task.getPlannedTime() != null) {
                builder.plannedTime(FRONT_T_FORMATTER.format(task.getPlannedTime()));
            }

            // Выставление флага просроченной задачи
            if (task.getStatus() != TaskStatus.DONE) {
                LocalTime plannedTime = task.getPlannedTime() != null ? task.getPlannedTime() : LocalTime.MIN;
                LocalDateTime plannedDateTime = LocalDateTime.of(task.getPlannedDate(), plannedTime);

                if (plannedDateTime.isBefore(LocalDateTime.now(timeZone.toZoneId()))) {
                    builder.overdue(true);
                }
            }
        }

        return builder.build();
    }
}
