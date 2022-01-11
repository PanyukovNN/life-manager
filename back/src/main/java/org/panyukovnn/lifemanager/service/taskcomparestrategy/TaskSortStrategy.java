package org.panyukovnn.lifemanager.service.taskcomparestrategy;

import org.panyukovnn.lifemanager.model.Task;
import org.panyukovnn.lifemanager.model.TaskSortType;

import java.util.Comparator;

/**
 * Стратегии сортировки задач.
 */
public interface TaskSortStrategy {

    /**
     * Вернуть компаратор.
     *
     * @return компаратор
     */
    Comparator<Task> getComparator();

    /**
     * Вернуть способ сортировки.
     *
     * @return способ сортировки
     */
    TaskSortType getTaskCompareType();
}
