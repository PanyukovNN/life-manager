package org.panyukovnn.lifemanager.model;

/**
 * Способ сортировки задач.
 */
public enum TaskCompareType {

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
    DATE_ADDED_FIRST
}
