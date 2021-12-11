package org.panyukovnn.lifemanager.controller.serviceadapter;

import lombok.Builder;
import lombok.Getter;
import org.panyukovnn.lifemanager.model.TaskCompareType;
import org.panyukovnn.lifemanager.model.TaskStatus;

import java.time.LocalDate;
import java.util.List;

/**
 * Параметры для поиска списка задач
 */
@Getter
@Builder
public class TaskListParams {

    /**
     * Диапазон приоритетов
     */
    private final List<Integer> priorityRange;

    /**
     * Список статусов
     */
    private final List<TaskStatus> statuses;

    /**
     * Список категорий
     */
    private final List<String> categories;

    /**
     * Дата начала периода
     */
    private final LocalDate startDate;

    /**
     * Дата окончания периода
     */
    private final LocalDate endDate;

    /**
     * Способ сортировки
     */
    private final TaskCompareType compareType;
}
