package org.panyukovnn.lifemanager.service.taskcomparestrategy;

import org.panyukovnn.lifemanager.model.Task;
import org.panyukovnn.lifemanager.model.TaskSortType;
import org.springframework.stereotype.Service;

import java.util.Comparator;

/**
 * Стратегия сортировки задач в порядке планируемой даты исполенния.
 */
@Service
public class DatePlannedFirstSort implements TaskSortStrategy {

    @Override
    public Comparator<Task> getComparator() {
        return Comparator.comparing(Task::getPlannedDate, Comparator.nullsFirst(Comparator.naturalOrder()))
                .thenComparing(Task::getPlannedTime, Comparator.nullsFirst(Comparator.naturalOrder()))
                .thenComparing(Task::getPriority);
    }

    @Override
    public TaskSortType getTaskCompareType() {
        return TaskSortType.DATE_PLANNED_FIRST;
    }
}
