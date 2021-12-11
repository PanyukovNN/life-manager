package org.panyukovnn.lifemanager.model;

public class Constants {

    /**
     * Сообщения
     */
    public static final String ERROR_OCCURRED_MSG = "Возникла ошибка: ";
    public static final String TASK_REMOVED_SUCCESSFULLY = "Задача \"%s\" успешно удалена";
    public static final String TASKS_REMOVED_SUCCESSFULLY = "Задачи \"%s\" успешно удалены";
    public static final String CATEGORY_REMOVED_SUCCESSFULLY = "Раздел \"%s\" успешно удален";
    public static final String STATUS_SET_SUCCESSFULLY = "Успешно установлен статус \"%s\" задачам \"%s\"";

    /**
     * Текстовки ошибок
     */
    public static final String WRONG_PRIORITY_STRING_VALUE_ERROR_MSG = "Неверное строковое значение приоритета";
    public static final String WRONG_PRIORITY_LETTER_VALUE_ERROR_MSG = "Неверная буква приоритета";
    public static final String WRONG_PRIORITY_INT_VALUE_ERROR_MSG = "Неверное числовое значение приоритета";
    public static final String CATEGORY_NOT_FOUND_ERROR_MSG = "Категория не найдена";
    public static final String NULL_TASK_ERROR_MSG = "Задача не может быть пустой";
    public static final String NULL_CATEGORY_ERROR_MSG = "Раздел не может быть пустым";

    /**
     * Параметры
     */
    public static final String STATUS = "status";
    public static final String PRIORITY = "priority";
    public static final String CATEGORY_NAME = "category.name";
    public static final String COMPLETION_DATE = "completionDate";

    /**
     * Другое
     */
    // Строка должна состоять из двух символов, первый от A до D, второй от 1 до 4
    public static final String PRIORITY_PATTERN = "^[A-D][1-4]$";
    public static final String PRIORITY_PATTERN_OR_EMPTY = PRIORITY_PATTERN + "|";
}
