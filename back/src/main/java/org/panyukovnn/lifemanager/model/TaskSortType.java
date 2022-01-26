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
     * В обратном порядке даты добавления.
     */
    DATE_ADDED_LAST,

    /**
     * В обратном порядке выполнения.
     */
    DONE_DATE_TIME_LAST
}
