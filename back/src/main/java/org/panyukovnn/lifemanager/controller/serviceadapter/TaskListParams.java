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
     * Начальная дата выполнения.
     */
    private final LocalDate doneStartDate;

    /**
     * Конечная дата выполнения.
     */
    private final LocalDate doneEndDate;

    /**
     * Способ сортировки.
     */
    private final TaskSortType sortType;
}
