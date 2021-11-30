package org.panyukovnn.lifemanager.service.taskcomparestrategy;

import org.panyukovnn.lifemanager.model.Task;
import org.panyukovnn.lifemanager.model.TaskCompareType;
import org.springframework.stereotype.Service;

import java.util.Comparator;

/**
 * Стратегия сортировки задач сначала по приоритету
 */
@Service
public class PriorityFirstStrategy implements TaskCompareStrategy {

    @Override
    public Comparator<Task> getComparator() {
        return Comparator.comparing(Task::getPriority)
                .thenComparing(Comparator.nullsFirst(Comparator.comparing(Task::getCompletionDateTime)))
                .reversed();
    }

    @Override
    public TaskCompareType getTaskCompareType() {
        return TaskCompareType.PRIORITY_FIRST;
    }
}