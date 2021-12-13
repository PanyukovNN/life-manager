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
     * @param id идентификатор
     * @param priority приортитет
     * @param description текст
     * @param categoryName наименование категории
     * @param status статус
     * @param completionDate дата выполнения
     * @param completionTime время выполнения
     * @return созданная/обновленная задача
     */
    public Task createUpdate(String id,
                             int priority,
                             String description,
                             String categoryName,
                             TaskStatus status,
                             LocalDate completionDate,
                             LocalTime completionTime) {
        Task task = new Task();

        if (StringUtils.isNotBlank(id)) {
            taskRepository.findById(id)
                    .ifPresent(taskFromDb -> task.setId(taskFromDb.getId()));
        }

        if (task.getCreationDateTime() == null) {
            task.setCreationDateTime(LocalDateTime.now());
        }

        task.setPriority(priority);
        task.setDescription(description);
        task.setStatus(status);
        task.setCategoryName(categoryName);
        task.setCompletionDate(completionDate);
        task.setCompletionTime(completionTime);

        return taskRepository.save(task);
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
                    Criteria.where(COMPLETION_DATE).is(null),
                    Criteria.where(COMPLETION_DATE).gte(params.getStartDate())
            ));
        }

        if (params.getEndDate() != null && params.getEndDate() != LocalDate.MAX) {
            criteriaList.add(new Criteria().orOperator(
                    Criteria.where(COMPLETION_DATE).is(null),
                    Criteria.where(COMPLETION_DATE).lte(params.getEndDate())
            ));
        }

        query.addCriteria(new Criteria().andOperator(criteriaList.toArray(new Criteria[0])));

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
     * @return транспортный объект задачи
     */
    public TaskDto convertToDto(Task task) {
        Objects.requireNonNull(task, NULL_TASK_ERROR_MSG);
        Objects.requireNonNull(task.getCategoryName(), NULL_CATEGORY_NAME_ERROR_MSG);

        String priority = ControllerHelper.priorityToParam(task.getPriority());
        String categoryName = task.getCategoryName();

        TaskDto.TaskDtoBuilder builder = TaskDto.builder()
                .id(task.getId())
                .description(task.getDescription())
                .priority(priority)
                .category(categoryName);

        if (task.getCompletionDate() != null) {
            builder.completionDate(FRONT_D_FORMATTER.format(task.getCompletionDate()));
        }

        if (task.getCompletionTime() != null) {
            builder.completionTime(FRONT_T_FORMATTER.format(task.getCompletionTime()));
        }

        return builder.build();
    }
}
