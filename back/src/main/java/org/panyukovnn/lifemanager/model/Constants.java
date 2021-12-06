package org.panyukovnn.lifemanager.model;

public class Constants {

    /**
     * Сообщения
     */
    public static final String ERROR_OCCURRED_MSG = "Возникла ошибка: ";
    public static final String TASK_REMOVED_SUCCESSFULLY = "Задача \"%s\" успешно удалена";
    public static final String CATEGORY_REMOVED_SUCCESSFULLY = "Раздел \"%s\" успешно удален";

    /**
     * Текстовки ошибок
     */
    public static final String NULL_CREATE_UPDATE_TASK_REQUEST_ERROR_MSG = "Запрос на создание/изменение задачи не может быть равен null";
    public static final String NULL_CREATE_UPDATE_CATEGORY_REQUEST_ERROR_MSG = "Запрос на создание/изменение категории задач не может быть равен null";
    public static final String NULL_FIND_LIST_REQUEST_ERROR_MSG = "Запрос на поиск списка задач не может быть равен null";
    public static final String WRONG_PRIORITY_STRING_VALUE_ERROR_MSG = "Неверное строковое значение приоритета";
    public static final String WRONG_PRIORITY_LETTER_VALUE_ERROR_MSG = "Неверная буква приоритета";
    public static final String WRONG_PRIORITY_INT_VALUE_ERROR_MSG = "Неверное числовое значение приоритета";
    public static final String CATEGORY_NOT_FOUND_ERROR_MSG = "Категория не найдена";
}
