package org.panyukovnn.lifemanager.service;

import io.micrometer.core.instrument.util.StringUtils;
import org.panyukovnn.lifemanager.model.Category;
import org.panyukovnn.lifemanager.model.Task;
import org.panyukovnn.lifemanager.model.TaskCompareType;
import org.panyukovnn.lifemanager.model.TaskStatus;
import org.panyukovnn.lifemanager.repository.TaskRepository;
import org.panyukovnn.lifemanager.service.taskcomparestrategy.TaskCompareStrategyManager;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.panyukovnn.lifemanager.model.Constants.WRONG_PRIORITY_STRING_VALUE_ERROR_MSG;

/**
 * Сервис задач
 */
@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final MongoTemplate mongoTemplate;
    private final TaskCompareStrategyManager compareStrategyManager;

    /**
     * Конструктор
     *
     * @param taskRepository репозиторий задач
     * @param mongoTemplate сервис работы с монго запросами
     * @param compareStrategyManager менеджер стратегий сортировки задач
     */
    public TaskService(TaskRepository taskRepository,
                       MongoTemplate mongoTemplate,
                       TaskCompareStrategyManager compareStrategyManager) {
        this.taskRepository = taskRepository;
        this.mongoTemplate = mongoTemplate;
        this.compareStrategyManager = compareStrategyManager;
    }

    /**
     * Создать/обновить задачу
     *
     * @param id идентификатор
     * @param priority приортитет
     * @param description текст
     * @param status статус
     * @param completionDateTime дата и время выполнения
     * @return созданная/обновленная задача
     */
    //TODO методы должны получать подготовленные данные
    public Task createUpdate(String id,
                             String priority,
                             String description,
                             String status,
                             LocalDateTime completionDateTime) {


        Task task = new Task();

        if (StringUtils.isNotBlank(id)) {
            Task taskFromDb = taskRepository.findById(id).orElse(null);

            if (taskFromDb != null) {
                task = taskFromDb;
            } else {
                task.setCreationDateTime(LocalDateTime.now());
            }
        }

        task.setPriority(definePriority(priority));
        task.setDescription(description);
        task.setStatus(TaskStatus.valueOf(status));
        task.setCompletionDateTime(completionDateTime);

        return taskRepository.save(task);
    }

    /**
     * Поиск задач по набору параметров
     * Если какой либо из параметров равен null, то он не учитывается
     *
     * @param priority приоритет
     * @param taskStatuses список статусов
     * @param categories список категорий
     * @param startDate дата начала
     * @param endDate дата окончания
     * @param compareType способ сортировки задач
     * @return список найденных задач
     */
    public List<Task> findList(Integer priority,
                               List<TaskStatus> taskStatuses,
                               List<Category> categories,
                               LocalDate startDate,
                               LocalDate endDate,
                               TaskCompareType compareType) {
        Query query = new Query();
        List<Criteria> criteriaList = new ArrayList<>();

        if (priority != null) {
            criteriaList.add(Criteria.where("priority").is(priority));
        }

        if (!CollectionUtils.isEmpty(taskStatuses)) {
            criteriaList.add(Criteria.where("status").in(taskStatuses));
        }

        if (!CollectionUtils.isEmpty(categories)) {
            criteriaList.add(Criteria.where("category").in(categories));
        }

        if (startDate != null) {
            criteriaList.add(Criteria.where("completionDateTime").gte(startDate));
        }

        if (endDate != null) {
            criteriaList.add(Criteria.where("completionDateTime").lte(endDate));
        }

        query.addCriteria(new Criteria().andOperator(criteriaList.toArray(new Criteria[0])));

        List<Task> tasks = mongoTemplate.find(query, Task.class);
        tasks.sort(compareStrategyManager.resolveStrategy(compareType));

        return tasks;
    }

    /**
     * Вернуть все задачи, отсортированные сначала по приоритету, затем по дате
     *
     * @return список задач
     */
    public List<Task> findAll() {
        List<Task> allTasks = taskRepository.findAll();
        allTasks.sort(Collections.reverseOrder());

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
     * Определить числовое значение приоритета по строчной записи
     * Например строке А1 соответствует приоритет 15
     *
     * @param priorityParam строчная запись приоритета
     * @return числовое значение приоритета
     */
    private int definePriority(String priorityParam) {
        if (StringUtils.isBlank(priorityParam) || priorityParam.length() != 2) {
            throw new IllegalArgumentException(WRONG_PRIORITY_STRING_VALUE_ERROR_MSG);
        }

        char letter = priorityParam.charAt(0);
        int digit = Character.getNumericValue(priorityParam.charAt(1));

        if (letter < 'A' || letter > 'D'
                || digit < 1 || digit > 4) {
            throw new IllegalArgumentException(WRONG_PRIORITY_STRING_VALUE_ERROR_MSG);
        }

        // Возвращает максимальное число диапазона по букве (Например, если А то 4, если D то 0)
        int multiplier = 4 * (4 - letter + 'A');

        // Уменьшаем максимальное число диапазона на число (Например, если А2 то 14, если C4 то 4)
        return multiplier - digit;
    }
}
