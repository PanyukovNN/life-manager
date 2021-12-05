package org.panyukovnn.lifemanager.model;

/**
 * Способ сортировки задач
 */
public enum TaskCompareType {

    /**
     * В порядке приоритета
     */
    PRIORITY_FIRST,

    /**
     * В порядке даты исполнения
     */
    DATE_COMPLETION_FIRST,

    /**
     * В порядке даты добавления
     */
    DATE_ADDED_FIRST
}
