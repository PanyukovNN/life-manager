package org.panyukovnn.lifemanager.model;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Константы.
 */
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class Constants {

    /**
     * Сообщения.
     */
    public static final String TASK_REMOVED_SUCCESSFULLY = "Задача успешно удалена";
    public static final String TASKS_REMOVED_SUCCESSFULLY = "Задачи успешно удалены";
    public static final String TASKS_CREATED_UPDATED_SUCCESSFULLY = "Задача успешно создана/обновлена";
    public static final String CATEGORY_REMOVED_SUCCESSFULLY = "Раздел и все его задачи успешно удалены";
    public static final String CATEGORY_CREATED_SUCCESSFULLY = "Раздел успешно создан";
    public static final String CATEGORY_UPDATED_SUCCESSFULLY = "Раздел успешно обновлен";
    public static final String CATEGORY_MOVED_TO_RECENTLY_DELETED_SUCCESSFULLY = "Раздел \"%s\" успешно удалён";
    public static final String CATEGORY_RECOVERED_FROM_RECENTLY_DELETED_SUCCESSFULLY = "Раздел \"%s\" успешно восстановлен";
    public static final String TO_DO_STATUS_SET_SUCCESSFULLY = "Задача возвращена в работу";
    public static final String DONE_STATUS_SET_SUCCESSFULLY = "Ура, задача выполнена!";
    public static final String STATUS_SET_SUCCESSFULLY = "Статус \"%s\" успешно установлен";
    public static final String SING_UP_SUCCESSFUL = "Пользователь успешно зарегистрирован.";

    /**
     * Текстовки ошибок.
     */
    public static final String WRONG_PRIORITY_ERROR_MSG = "Неверное значение приоритета";
    public static final String TASK_NOT_FOUND_ERROR_MSG = "Задача не найдена";
    public static final String CATEGORY_NOT_FOUND_ERROR_MSG = "Раздел не найден";
    public static final String NO_CATEGORY_FOR_TASK_ERROR_MSG = "Невозможно создать задачу без раздела";
    public static final String NO_ONE_CATEGORY_FOUND_ERROR_MSG = "Не удалось найти ни одного раздела";
    public static final String NULL_TASK_ERROR_MSG = "Задача не может быть пустой";
    public static final String NULL_CATEGORY_ERROR_MSG = "Раздел не может быть пустым";
    public static final String NULL_CATEGORY_ID_ERROR_MSG = "Идентификатор раздела не может быть пустым";
    public static final String RECENTLY_DELETED_CATEGORY_ALREADY_EXISTS_ERROR_MSG = "Раздел с данным наименованием находится в папке 'недавно удаленных'";
    public static final String CATEGORY_ALREADY_EXISTS_ERROR_MSG = "Раздел с данным наименованием уже существует";
    public static final String WRONG_TASK_ID_ERROR_MSG = "Неверный идентификатор задачи.";
    public static final String RESOURCE_FILE_NOT_FOUND_ERROR_MSG = "Не найден файл ресурсов ";
    public static final String USER_NOT_FOUND_ERROR = "Пользователь \"%s\" не найден.";
    public static final String USER_WITH_EMAIL_NOT_FOUND_ERROR = "Пользователь с почтовым ящиком \"%s\" не найден.";
    public static final String USER_NOT_ACTIVATED = "Аккаунт \"%s\" не активирован.";
    public static final String USER_ALREADY_EXISTS_BY_NAME = "Пользователь с данным именем уже зарегистрирован";
    public static final String USER_ALREADY_EXISTS_BY_EMAIL = "Пользователь с данным почтовым ящиком уже зарегистрирован";
    public static final String BLANK_USER_NAME_ERROR_MSG = "Имя пользователя не может быть пустым";
    public static final String BLANK_PASSWORD_ERROR_MSG = "Пароль не может быть пустым";
    public static final String WRONG_EMAIL_ERROR_MSG = "Некорректный email";
    public static final String BLANK_EMAIL_ERROR_MSG = "Email не может быть пустым";
    public static final String WRONG_PASSWORD_ERROR_MSG = "Неверный пароль.";
    public static final String PASSWORDS_DO_NOT_MATCH_ERROR_MSG = "Пароли не совпадают";
    public static final String EMPTY_DELETE_IDS_ERROR_MSG = "Не заданы идентификаторы удаляемых сущностей";


    /**
     * Параметры.
     */
    public static final String STATUS = "status";
    public static final String PRIORITY = "priority";
    public static final String CATEGORY = "category";
    public static final String DONE_DATE_TIME_KEY = "doneDateTime";
    public static final String CONFIRM_PASSWORD_KEY = "confirmPassword";


    /**
     * Другое.
     */
    // Строка должна состоять из двух символов, первый от A до D, второй от 1 до 4
    public static final String PRIORITY_PATTERN = "^[A-D]$";
    public static final String PRIORITY_PATTERN_OR_EMPTY = "^[A-D]$|";
    // Список допустимых приоритетов
    public static final List<Character> PRIORITIES = List.of('A', 'B', 'C', 'D');
}
