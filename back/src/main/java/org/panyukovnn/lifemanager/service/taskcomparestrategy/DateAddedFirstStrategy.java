package org.panyukovnn.lifemanager.service.taskcomparestrategy;

import org.panyukovnn.lifemanager.model.Task;
import org.panyukovnn.lifemanager.model.TaskCompareType;
import org.springframework.stereotype.Service;

import java.util.Comparator;

/**
 * Стратегия сортировки задач в порядке даты добавления.
 */
@Service
public class DateAddedFirstStrategy implements TaskCompareStrategy {

    @Override
    public Comparator<Task> getComparator() {
        return Comparator.comparing(Task::getCreationDateTime)
                .thenComparing(Task::getPriority)
                .thenComparing(Task::getPlannedDate, Comparator.nullsFirst(Comparator.naturalOrder()))
                .thenComparing(Task::getPlannedTime, Comparator.nullsFirst(Comparator.naturalOrder()))
                .reversed();
    }

    @Override
    public TaskCompareType getTaskCompareType() {
        return TaskCompareType.DATE_ADDED_FIRST;
    }
}
