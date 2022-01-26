package org.panyukovnn.lifemanager.service.taskcomparestrategy;

import org.panyukovnn.lifemanager.model.Task;
import org.panyukovnn.lifemanager.model.TaskSortType;
import org.springframework.stereotype.Service;

import java.util.Comparator;

/**
 * Стратегия сортировки задач в обратном порядке выполнения.
 */
@Service
public class DoneDateTimeLastSort implements TaskSortStrategy {

    @Override
    public Comparator<Task> getComparator() {
        return Comparator.comparing(Task::getDoneDateTime, Comparator.nullsLast(Comparator.naturalOrder()))
                .thenComparing(Task::getCreationDateTime, Comparator.nullsFirst(Comparator.naturalOrder()))
                .thenComparing(Task::getId);
    }

    @Override
    public TaskSortType getTaskCompareType() {
        return TaskSortType.DONE_DATE_TIME_LAST;
    }
}
