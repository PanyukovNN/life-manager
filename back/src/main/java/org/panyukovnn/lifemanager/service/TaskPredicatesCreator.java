package org.panyukovnn.lifemanager.service;

import io.micrometer.core.instrument.util.StringUtils;
import org.panyukovnn.lifemanager.controller.serviceadapter.TaskListParams;
import org.panyukovnn.lifemanager.model.Task;
import org.panyukovnn.lifemanager.model.TaskStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.panyukovnn.lifemanager.model.Constants.*;
import static org.panyukovnn.lifemanager.model.Constants.PLANNED_DATE;

/**
 * Сервис создания предикатов поиска задач по заданным параметрам.
 */
@Service
public class TaskPredicatesCreator {

    /**
     * Создает предикаты для поиска задач, в зависимости от переданных парамтеров.
     *
     * @param params параметры поиска задач
     * @param criteriaBuilder билдер criteria запроса
     * @param rootTask корневой объект поиска элементов
     * @return массив предикатов
     */
    public Predicate[] createPredicates(TaskListParams params, CriteriaBuilder criteriaBuilder, Root<Task> rootTask) {
        List<Predicate> predicates = new ArrayList<>();

        createPriorityPredicate(params.getPriority(), criteriaBuilder, rootTask)
                .ifPresent(predicates::add);
        createStatusesPredicate(params.getStatuses(), criteriaBuilder, rootTask)
                .ifPresent(predicates::add);
        createCategoryIdsPredicate(params.getCategoryIds(), criteriaBuilder, rootTask)
                .ifPresent(predicates::add);
        createStartDatePredicate(params.getStartDate(), criteriaBuilder, rootTask)
                .ifPresent(predicates::add);
        createEndDatePredicate(params.getEndDate(), criteriaBuilder, rootTask)
                .ifPresent(predicates::add);

        return predicates.toArray(Predicate[]::new);
    }

    private Optional<Predicate> createPriorityPredicate(String priority, CriteriaBuilder criteriaBuilder, Root<Task> rootTask) {
        if (StringUtils.isEmpty(priority)) {
            return Optional.empty();
        }

        return Optional.of(criteriaBuilder.equal(rootTask.get(PRIORITY), priority));
    }

    private Optional<Predicate> createStatusesPredicate(List<TaskStatus> statuses, CriteriaBuilder criteriaBuilder, Root<Task> rootTask) {
        if (CollectionUtils.isEmpty(statuses)) {
            return Optional.empty();
        }

        CriteriaBuilder.In<TaskStatus> statusesPredicate = criteriaBuilder.in(rootTask.get(STATUS));
        statuses.forEach(statusesPredicate::value);

        return Optional.of(statusesPredicate);
    }

    private Optional<Predicate> createCategoryIdsPredicate(List<Long> categoryIds, CriteriaBuilder criteriaBuilder, Root<Task> rootTask) {
        if (CollectionUtils.isEmpty(categoryIds)) {
            return Optional.empty();
        }

        CriteriaBuilder.In<Long> categoryIdsPredicate = criteriaBuilder.in(rootTask.get(CATEGORY));
        categoryIds.forEach(categoryIdsPredicate::value);

        return Optional.of(categoryIdsPredicate);
    }

    private Optional<Predicate> createStartDatePredicate(LocalDate startDate, CriteriaBuilder criteriaBuilder, Root<Task> rootTask) {
        if (startDate == null) {
            return Optional.empty();
        }

        Predicate startDateIsNullPredicate = criteriaBuilder.isNull(rootTask.get(PLANNED_DATE));
        Predicate startDateGtePredicate = criteriaBuilder.greaterThanOrEqualTo(rootTask.get(PLANNED_DATE), startDate);

        Predicate startDatePredicate = criteriaBuilder.or(startDateIsNullPredicate, startDateGtePredicate);

        return Optional.of(startDatePredicate);
    }

    private Optional<Predicate> createEndDatePredicate(LocalDate endDate, CriteriaBuilder criteriaBuilder, Root<Task> rootTask) {
        if (endDate == null || endDate == LocalDate.MAX) {
            return Optional.empty();
        }

        Predicate endDateIsNullPredicate = criteriaBuilder.isNull(rootTask.get(PLANNED_DATE));
        Predicate endDateLtePredicate = criteriaBuilder.lessThanOrEqualTo(rootTask.get(PLANNED_DATE), endDate);

        Predicate endDatePredicate = criteriaBuilder.or(endDateIsNullPredicate, endDateLtePredicate);

        return Optional.of(endDatePredicate);
    }
}
