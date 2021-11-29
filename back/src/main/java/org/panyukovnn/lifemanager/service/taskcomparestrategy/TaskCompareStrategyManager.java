package org.panyukovnn.lifemanager.service.taskcomparestrategy;

import org.panyukovnn.lifemanager.model.Task;
import org.panyukovnn.lifemanager.model.TaskCompareType;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * Менеджер стратегий сортировки задач
 */
@Service
public class TaskCompareStrategyManager {

    private final Map<TaskCompareType, TaskCompareStrategy> compareStrategyMap = new HashMap<>();

    /**
     * Конструктор
     *
     * @param compareStrategies стратегии сортировки задач
     */
    public TaskCompareStrategyManager(Set<TaskCompareStrategy> compareStrategies) {
        compareStrategies.forEach(strategy ->
                compareStrategyMap.put(strategy.getTaskCompareType(), strategy));
    }

    /**
     * Получить компаратор по способу сортировки
     *
     * @param type способ сортировки
     * @return компаратор
     */
    public Comparator<Task> resolveStrategy(TaskCompareType type) {
        return compareStrategyMap.get(type).getComparator();
    }
}
