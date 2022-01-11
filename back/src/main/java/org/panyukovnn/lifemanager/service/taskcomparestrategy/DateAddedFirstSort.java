package org.panyukovnn.lifemanager.service.taskcomparestrategy;

import org.panyukovnn.lifemanager.model.Task;
import org.panyukovnn.lifemanager.model.TaskSortType;
import org.springframework.stereotype.Service;

import java.util.Comparator;

/**
 * Стратегия сортировки задач в порядке даты добавления.
 */
@Service
public class DateAddedFirstSort implements TaskSortStrategy {

    @Override
    public Comparator<Task> getComparator() {
        return Comparator.comparing(Task::getCreationDateTime)
                .thenComparing(Task::getPriority)
                .thenComparing(Task::getPlannedDate, Comparator.nullsFirst(Comparator.naturalOrder()))
                .thenComparing(Task::getPlannedTime, Comparator.nullsFirst(Comparator.naturalOrder()))
                .reversed();
    }

    @Override
    public TaskSortType getTaskCompareType() {
        return TaskSortType.DATE_ADDED_FIRST;
    }
}
