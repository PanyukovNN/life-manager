package org.panyukovnn.lifemanager.controller.serviceadapter;

import lombok.Builder;
import lombok.Getter;
import org.panyukovnn.lifemanager.model.TaskSortType;
import org.panyukovnn.lifemanager.model.TaskStatus;

import java.time.LocalDate;
import java.util.List;

/**
 * Параметры для поиска списка задач.
 */
@Getter
@Builder
public class TaskListParams {

    /**
     * Приоритет.
     */
    private final String priority;

    /**
     * Список статусов.
     */
    private final List<TaskStatus> statuses;

    /**
     * Список идентификаторов категорий.
     */
    private final List<Long> categoryIds;

    /**
     * Дата начала периода.
     */
    private final LocalDate startDate;

    /**
     * Дата окончания периода.
     */
    private final LocalDate endDate;

    /**
     * Способ сортировки.
     */
    private final TaskSortType sortType;
}
