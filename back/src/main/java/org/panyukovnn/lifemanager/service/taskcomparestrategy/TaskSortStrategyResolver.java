package org.panyukovnn.lifemanager.service.taskcomparestrategy;

import org.panyukovnn.lifemanager.model.Task;
import org.panyukovnn.lifemanager.model.TaskSortType;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Менеджер стратегий сортировки задач.
 */
@Service
public class TaskSortStrategyResolver {

    private final Map<TaskSortType, TaskSortStrategy> strategyMap = new EnumMap<>(TaskSortType.class);

    /**
     * Конструктор.
     *
     * @param sortStrategies стратегии сортировки задач
     */
    public TaskSortStrategyResolver(Set<TaskSortStrategy> sortStrategies) {
        sortStrategies.forEach(strategy -> strategyMap.put(strategy.getTaskCompareType(), strategy));
    }

    /**
     * Получить компаратор по способу сортировки.
     *
     * @param type способ сортировки
     * @return компаратор
     */
    public Comparator<Task> resolve(TaskSortType type) {
        return strategyMap.get(type).getComparator();
    }
}
