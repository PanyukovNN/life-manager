package org.panyukovnn.lifemanager.service.taskcomparestrategy;

import org.panyukovnn.lifemanager.model.Task;
import org.panyukovnn.lifemanager.model.TaskCompareType;
import org.springframework.stereotype.Service;

import java.util.Comparator;

/**
 * Стратегия сортировки задач сначала по дате
 */
@Service
public class DateFirstStrategy implements TaskCompareStrategy {

    @Override
    public Comparator<Task> getComparator() {
        return Comparator.comparing(Task::getCompletionDate, Comparator.nullsFirst(Comparator.naturalOrder()))
                .thenComparing(Task::getCompletionTime, Comparator.nullsFirst(Comparator.naturalOrder()))
                .thenComparing(Task::getPriority);
    }

    @Override
    public TaskCompareType getTaskCompareType() {
        return TaskCompareType.DATE_FIRST;
    }
}
