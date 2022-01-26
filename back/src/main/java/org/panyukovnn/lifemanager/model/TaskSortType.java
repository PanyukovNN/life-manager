package org.panyukovnn.lifemanager.model;

/**
 * Способ сортировки задач.
 */
public enum TaskSortType {

    /**
     * Без сортировки.
     */
    NONE,

    /**
     * В порядке приоритета.
     */
    PRIORITY_FIRST,

    /**
     * В порядке планируемой даты исполнения.
     */
    DATE_PLANNED_FIRST,

    /**
     * В порядке даты добавления.
     */
    DATE_ADDED_FIRST,

    /**
     * В порядке последнего изменения статуса
     */
    LAST_STATUS_CHANGE_DATE_TIME_FIRST
}
