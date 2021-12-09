package org.panyukovnn.lifemanager.service;

import io.micrometer.core.instrument.util.StringUtils;
import lombok.Builder;
import org.hibernate.criterion.Restrictions;
import org.panyukovnn.lifemanager.model.Category;
import org.panyukovnn.lifemanager.model.Task;
import org.panyukovnn.lifemanager.model.TaskCompareType;
import org.panyukovnn.lifemanager.model.TaskStatus;
import org.panyukovnn.lifemanager.model.request.FindTaskListRequest;
import org.panyukovnn.lifemanager.repository.TaskRepository;
import org.panyukovnn.lifemanager.service.periodstrategy.PeriodStrategyResolver;
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

/**
 * Сервис задач
 */
@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final MongoTemplate mongoTemplate;
    private final PeriodStrategyResolver periodStrategyResolver;
    private final TaskCompareStrategyResolver compareStrategyManager;

    /**
     * Конструктор
     *
     * @param taskRepository репозиторий задач
     * @param mongoTemplate сервис работы с монго запросами
     * @param periodStrategyResolver менеджер стратегий определения периода
     * @param compareStrategyManager менеджер стратегий сортировки задач
     */
    public TaskService(TaskRepository taskRepository,
                       MongoTemplate mongoTemplate,
                       PeriodStrategyResolver periodStrategyResolver,
                       TaskCompareStrategyResolver compareStrategyManager) {
        this.taskRepository = taskRepository;
        this.mongoTemplate = mongoTemplate;
        this.periodStrategyResolver = periodStrategyResolver;
        this.compareStrategyManager = compareStrategyManager;
    }

    /**
     * Создать/обновить задачу
     *
     * @param id идентификатор
     * @param priority приортитет
     * @param description текст
     * @param category категория
     * @param status статус
     * @param completionDate дата выполнения
     * @param completionTime время выполнения
     * @return созданная/обновленная задача
     */
    public Task createUpdate(String id,
                             int priority,
                             String description,
                             Category category,
                             TaskStatus status,
                             LocalDate completionDate,
                             LocalTime completionTime) {
        Task task = new Task();

        if (StringUtils.isNotBlank(id)) {
            Task taskFromDb = taskRepository.findById(id).orElse(null);

            if (taskFromDb != null) {
                task = taskFromDb;
            }
        }

        if (task.getCreationDateTime() == null) {
            task.setCreationDateTime(LocalDateTime.now());
        }

        task.setPriority(priority);
        task.setDescription(description);
        task.setStatus(status);
        task.setCategory(category);
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

        if (!CollectionUtils.isEmpty(params.priorityRange)) {
            criteriaList.add(Criteria.where("priority").in(params.priorityRange));
        }

        if (!CollectionUtils.isEmpty(params.statuses)) {
            criteriaList.add(Criteria.where("status").in(params.statuses));
        }

        if (!CollectionUtils.isEmpty(params.categories)) {
            criteriaList.add(Criteria.where("category.name").in(params.categories));
        }

        if (params.startDate != null) {
            criteriaList.add(new Criteria().orOperator(
                    Criteria.where("completionDate").is(null),
                    Criteria.where("completionDate").gte(params.startDate)
            ));
        }

        if (params.endDate != null && params.endDate != LocalDate.MAX) {
            criteriaList.add(new Criteria().orOperator(
                    Criteria.where("completionDate").is(null),
                    Criteria.where("completionDate").lte(params.endDate)
            ));
        }

        //TODO добавить проверку на completionTime

        query.addCriteria(new Criteria().andOperator(criteriaList.toArray(new Criteria[0])));

        List<Task> tasks = mongoTemplate.find(query, Task.class);
        tasks.sort(compareStrategyManager.resolve(params.compareType));

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
        allTasks.sort(compareStrategyManager.resolve(compareType));

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
     * Преобразует запрос на поиск списка задач в набор параметров
     *
     * @param request запрос
     * @return параметры поиска задач
     */
    public TaskListParams findListRequestToParams(FindTaskListRequest request) {
        LocalDate startDate = LocalDate.now();
        LocalDate endDate = periodStrategyResolver.resolve(request.getPeriodType())
                .getEndDate(startDate);
        List<Integer> priorityRange = ControllerHelper.letterToPriorityRange(request.getPriority());

        return TaskListParams.builder()
                .priorityRange(priorityRange)
                .statuses(request.getTaskStatuses())
                .categories(request.getCategories())
                .startDate(startDate)
                .endDate(endDate)
                .compareType(request.getCompareType())
                .build();
    }

    /**
     * Транспортный объект параметров поиска задач
     */
    @Builder
    public static class TaskListParams {

        /**
         * Диапазон приоритетов
         */
        private final List<Integer> priorityRange;

        /**
         * Список статусов
         */
        private final List<TaskStatus> statuses;

        /**
         * Список категорий
         */
        private final List<String> categories;

        /**
         * Дата начала периода
         */
        private final LocalDate startDate;

        /**
         * Дата окончания периода
         */
        private final LocalDate endDate;

        /**
         * Способ сортировки
         */
        private final TaskCompareType compareType;
    }
}
