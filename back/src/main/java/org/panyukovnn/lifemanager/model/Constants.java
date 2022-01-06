package org.panyukovnn.lifemanager.model;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class Constants {

    /**
     * Сообщения
     */
    public static final String ERROR_OCCURRED_MSG = "Возникла ошибка: ";
    public static final String TASK_REMOVED_SUCCESSFULLY = "Задача \"%s\" успешно удалена";
    public static final String TASKS_REMOVED_SUCCESSFULLY = "Задачи успешно удалены";
    public static final String TASKS_CREATED_UPDATED_SUCCESSFULLY = "Задача успешно создана/обновлена";
    public static final String CATEGORY_REMOVED_SUCCESSFULLY = "Раздел \"%s\" успешно удален";
    public static final String CATEGORY_CREATED_UPDATED_SUCCESSFULLY = "Раздел \"%s\" успешно создан/обновлен";
    public static final String CATEGORY_SET_IN_ARCHIVE_SUCCESSFULLY = "Раздел \"%s\" успешно перемещён в архив";
    public static final String STATUS_SET_SUCCESSFULLY = "Успешно установлен статус \"%s\" задачам \"%s\"";

    /**
     * Текстовки ошибок
     */
    public static final String WRONG_PRIORITY_STRING_VALUE_ERROR_MSG = "Неверное строковое значение приоритета";
    public static final String WRONG_PRIORITY_LETTER_VALUE_ERROR_MSG = "Неверная буква приоритета";
    public static final String WRONG_PRIORITY_INT_VALUE_ERROR_MSG = "Неверное числовое значение приоритета";
    public static final String CATEGORY_NOT_FOUND_ERROR_MSG = "Категория не найдена";
    public static final String NO_CATEGORY_FOR_TASK_ERROR_MSG = "Невозможно создать задачу без категории";
    public static final String NULL_TASK_ERROR_MSG = "Задача не может быть пустой";
    public static final String NULL_CATEGORY_NAME_ERROR_MSG = "Наименование раздела не может быть пустым";
    public static final String CATEGORY_ALREADY_EXISTS_ERROR_MSG = "Категория с данным наименованием уже существует";
    public static final String UNABLE_TO_SET_CATEGORY_IN_ARCHIVE_ERROR_MSG = "Невозможно поместить раздел в архив, поскольку имеются невыполненные задачи";
    public static final String CATEGORY_ALREADY_IN_ARCHIVE_ERROR_MSG = "Раздел \"%s\" уже находится в архиве";
    public static final String UNABLE_TO_DELETE_CATEGORY_ERROR_MSG = "Невозможно удалить раздел, поскольку имеются выполненные задачи";
    public static final String WRONG_TASK_ID_ERROR_MSG = "Неверный идентификатор задачи.";
    public static final String RESOURCE_FILE_NOT_FOUND_ERROR_MSG = "Не найден файл ресурсов ";
    public static final String USER_NOT_FOUND_ERROR = "Пользователь \"%s\" не найден.";
    public static final String USER_NOT_ACTIVATED = "Аккаунт \"%s\" не активирован.";
    public static final String USER_ALREADY_EXISTS = "Пользователь с данным именем уже зарегистрирован.";


    /**
     * Параметры
     */
    public static final String STATUS = "status";
    public static final String PRIORITY = "priority";
    public static final String CATEGORY_NAME = "categoryName";
    public static final String PLANNED_DATE = "plannedDate";
    public static final String PASSWORD_KEY = "password";


    /**
     * Другое
     */
    // Строка должна состоять из двух символов, первый от A до D, второй от 1 до 4
    public static final String PRIORITY_PATTERN = "^[A-D][1-4]$";
    public static final String PRIORITY_LETTER_PATTERN_OR_EMPTY = "^[A-D]$|";
}
