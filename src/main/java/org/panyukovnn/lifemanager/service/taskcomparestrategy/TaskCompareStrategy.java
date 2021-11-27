package org.panyukovnn.lifemanager.service.taskcomparestrategy;

import org.panyukovnn.lifemanager.model.Task;
import org.panyukovnn.lifemanager.model.TaskCompareType;

import java.util.Comparator;

/**
 * Стратегии сортировки задач
 */
public interface TaskCompareStrategy {

    /**
     * Вернуть компаратор
     *
     * @return компаратор
     */
    Comparator<Task> getComparator();

    /**
     * Вернуть способ сортировки
     *
     * @return способ сортировки
     */
    TaskCompareType getTaskCompareType();
}
