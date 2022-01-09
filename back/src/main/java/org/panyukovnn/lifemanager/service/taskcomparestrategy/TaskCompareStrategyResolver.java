package org.panyukovnn.lifemanager.service.taskcomparestrategy;

import org.panyukovnn.lifemanager.model.Task;
import org.panyukovnn.lifemanager.model.TaskCompareType;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Менеджер стратегий сортировки задач.
 */
@Service
public class TaskCompareStrategyResolver {

    private final Map<TaskCompareType, TaskCompareStrategy> strategyMap = new EnumMap<>(TaskCompareType.class);

    /**
     * Конструктор.
     *
     * @param compareStrategies стратегии сортировки задач
     */
    public TaskCompareStrategyResolver(Set<TaskCompareStrategy> compareStrategies) {
        compareStrategies.forEach(strategy -> strategyMap.put(strategy.getTaskCompareType(), strategy));
    }

    /**
     * Получить компаратор по способу сортировки.
     *
     * @param type способ сортировки
     * @return компаратор
     */
    public Comparator<Task> resolve(TaskCompareType type) {
        return strategyMap.get(type).getComparator();
    }
}
