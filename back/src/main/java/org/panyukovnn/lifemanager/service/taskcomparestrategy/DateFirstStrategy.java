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
        return Comparator.nullsFirst(Comparator.comparing(Task::getCompletionDate))
                .thenComparing(Comparator.nullsLast(Comparator.comparing(Task::getCompletionTime)))
                .thenComparing(Task::getPriority);
    }

    @Override
    public TaskCompareType getTaskCompareType() {
        return TaskCompareType.DATE_FIRST;
    }
}
