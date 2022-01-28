package org.panyukovnn.lifemanager.service;

import io.micrometer.core.instrument.util.StringUtils;
import org.panyukovnn.lifemanager.controller.serviceadapter.TaskListParams;
import org.panyukovnn.lifemanager.model.DatePeriod;
import org.panyukovnn.lifemanager.model.Task;
import org.panyukovnn.lifemanager.model.TaskStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.panyukovnn.lifemanager.model.Constants.*;

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
        createStartDoneDatePredicate(params.getDoneDatePeriod(), criteriaBuilder, rootTask)
                .ifPresent(predicates::add);
        createEndDoneDatePredicate(params.getDoneDatePeriod(), criteriaBuilder, rootTask)
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

    private Optional<Predicate> createStartDoneDatePredicate(DatePeriod doneDatePeriod, CriteriaBuilder criteriaBuilder, Root<Task> rootTask) {
        if (doneDatePeriod == null || doneDatePeriod.getStart() == null) {
            return Optional.empty();
        }

        LocalDateTime startDoneDateTime = LocalDateTime.of(doneDatePeriod.getStart(), LocalTime.MIN);

        Predicate startDateIsNullPredicate = criteriaBuilder.isNull(rootTask.get(DONE_DATE_TIME_KEY));
        Predicate startDateGtePredicate = criteriaBuilder.greaterThanOrEqualTo(rootTask.get(DONE_DATE_TIME_KEY), startDoneDateTime);

        Predicate startDatePredicate = criteriaBuilder.or(startDateIsNullPredicate, startDateGtePredicate);

        return Optional.of(startDatePredicate);
    }

    private Optional<Predicate> createEndDoneDatePredicate(DatePeriod doneDatePeriod, CriteriaBuilder criteriaBuilder, Root<Task> rootTask) {
        if (doneDatePeriod == null || doneDatePeriod.getEnd() == null) {
            return Optional.empty();
        }

        LocalDateTime endDoneDateTime = LocalDateTime.of(doneDatePeriod.getEnd(), LocalTime.MAX);

        Predicate endDateIsNullPredicate = criteriaBuilder.isNull(rootTask.get(DONE_DATE_TIME_KEY));
        Predicate endDateLtePredicate = criteriaBuilder.lessThanOrEqualTo(rootTask.get(DONE_DATE_TIME_KEY), endDoneDateTime);

        Predicate endDatePredicate = criteriaBuilder.or(endDateIsNullPredicate, endDateLtePredicate);

        return Optional.of(endDatePredicate);
    }
}
