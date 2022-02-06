package org.panyukovnn.lifemanager.service.taskcomparestrategy;

import org.panyukovnn.lifemanager.model.Task;
import org.panyukovnn.lifemanager.model.TaskSortType;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Менеджер стратегий сортировки задач.
 */
@Service
public class TaskSortStrategyResolver {

    private final Map<TaskSortType, TaskSortStrategy> strategyMap;

    /**
     * Конструктор.
     *
     * @param sortStrategies стратегии сортировки задач
     */
    public TaskSortStrategyResolver(Set<TaskSortStrategy> sortStrategies) {
        strategyMap = sortStrategies.stream().collect(Collectors.toMap(
                TaskSortStrategy::getTaskCompareType,
                Function.identity()
        ));
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
