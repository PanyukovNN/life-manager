package org.panyukovnn.lifemanager.service;

import lombok.RequiredArgsConstructor;
import org.panyukovnn.lifemanager.controller.serviceadapter.TaskListParams;
import org.panyukovnn.lifemanager.exception.NotFoundException;
import org.panyukovnn.lifemanager.model.Task;
import org.panyukovnn.lifemanager.model.TaskSortType;
import org.panyukovnn.lifemanager.model.TaskStatus;
import org.panyukovnn.lifemanager.model.dto.TaskDto;
import org.panyukovnn.lifemanager.repository.TaskRepository;
import org.panyukovnn.lifemanager.service.taskcomparestrategy.TaskSortStrategyResolver;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Objects;
import java.util.TimeZone;

import static org.panyukovnn.lifemanager.model.Constants.*;
import static org.panyukovnn.lifemanager.service.ControllerHelper.*;

/**
 * Сервис задач.
 */
@Service
@RequiredArgsConstructor
public class TaskService {

    private final EntityManager entityManager;
    private final TaskRepository taskRepository;
    private final TaskPredicatesCreator taskPredicatesCreator;
    private final TaskSortStrategyResolver compareStrategyResolver;

    /**
     * Создать/обновить задачу.
     *
     * @param rawTask задача, сформированная из запроса
     * @param timeZone часовой пояс клиента
     * @return созданная/обновленная задача
     */
    @Transactional
    public Task createUpdate(Task rawTask, TimeZone timeZone) {
        boolean taskCreation = rawTask.getId() == null || rawTask.getId() == 0L;

        if (taskCreation) {
            LocalDateTime creationDateTime = LocalDateTime.now(timeZone.toZoneId());
            rawTask.setCreationDateTime(creationDateTime);

            return taskRepository.save(rawTask);
        }

        Task taskFromDb = taskRepository.findById(rawTask.getId())
                .orElseThrow(() -> new IllegalArgumentException(WRONG_TASK_ID_ERROR_MSG));

        taskFromDb.setDescription(rawTask.getDescription());
        taskFromDb.setPriority(rawTask.getPriority());
        taskFromDb.setCategory(rawTask.getCategory());
        taskFromDb.setPlannedDate(rawTask.getPlannedDate());
        taskFromDb.setPlannedTime(rawTask.getPlannedTime());

        return taskRepository.save(taskFromDb);
    }

    /**
     * Поиск задач по набору параметров.
     * Если какой либо из параметров равен null, то он не учитывается.
     *
     * @param params параметры поиска задач
     * @return список задач
     */
    public List<Task> findList(TaskListParams params) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Task> criteriaQuery = criteriaBuilder.createQuery(Task.class);

        Root<Task> task = criteriaQuery.from(Task.class);

        Predicate[] predicates = taskPredicatesCreator.createPredicates(params, criteriaBuilder, task);

        criteriaQuery.where(predicates);

        TypedQuery<Task> query = entityManager.createQuery(criteriaQuery);
        List<Task> tasks = query.getResultList();

        if (params.getSortType() != TaskSortType.NONE) {
            tasks.sort(compareStrategyResolver.resolve(params.getSortType()));
        }

        return tasks;
    }

    /**
     * Изменяет статус задачи.
     *
     * @param id идентификатор
     * @param status статус
     * @param timeZone часовой пояс клиента
     */
    @Transactional
    public void setStatus(Long id, TaskStatus status, TimeZone timeZone) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(TASK_NOT_FOUND_ERROR_MSG));

        task.setStatus(status);

        if (status == TaskStatus.DONE) {
            task.setDoneDateTime(LocalDateTime.now(timeZone.toZoneId()));
        }

        taskRepository.save(task);
    }

    /**
     * Вернуть все задачи, отсортированные сначала по приоритету, затем по дате.
     *
     * @param compareType способ сортировки задач
     * @return список задач
     */
    public List<Task> findAll(TaskSortType compareType) {
        List<Task> allTasks = taskRepository.findAll();
        allTasks.sort(compareStrategyResolver.resolve(compareType));

        return allTasks;
    }

    /**
     * Удалить задачу по идентификатору.
     *
     * @param id идентификатор
     */
    public void deleteById(Long id) {
        taskRepository.deleteById(id);
    }

    /**
     * Удалить задачи по списку идентификаторов.
     *
     * @param ids список идентификаторов
     */
    public void deleteByIds(List<Long> ids) {
        taskRepository.deleteAllById(ids);
    }

    /**
     * Конвертировать задачу в транспортный объект.
     *
     * @param task задача
     * @param timeZone часовой пояс клиента
     * @return транспортный объект задачи
     */
    public TaskDto convertToDto(Task task, TimeZone timeZone) {
        Objects.requireNonNull(task, NULL_TASK_ERROR_MSG);
        Objects.requireNonNull(task.getCategory(), NULL_CATEGORY_ERROR_MSG);

        TaskDto.TaskDtoBuilder builder = TaskDto.builder()
                .id(task.getId())
                .description(task.getDescription())
                .priority(task.getPriority())
                .categoryId(task.getCategory().getId())
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

        if (task.getDoneDateTime() != null) {
            builder.doneDateTime(FRONT_DT_FORMATTER.format(task.getDoneDateTime()));
        }

        return builder.build();
    }
}
