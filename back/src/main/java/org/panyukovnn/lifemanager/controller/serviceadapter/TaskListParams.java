package org.panyukovnn.lifemanager.controller.serviceadapter;

import lombok.Builder;
import lombok.Getter;
import org.panyukovnn.lifemanager.model.DatePeriod;
import org.panyukovnn.lifemanager.model.TaskSortType;
import org.panyukovnn.lifemanager.model.TaskStatus;

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
     * Период времени, в течение которого задача была выполнена.
     */
    private final DatePeriod doneDatePeriod;

    /**
     * Способ сортировки.
     */
    private final TaskSortType sortType;
}
