import {React} from "react";

/**
 * Ключи
 */
export const CATEGORY_KEY   = "category";

/**
 * Идентификаторы
 */
export const CATEGORY_SELECT_ID = "categorySelectId";
export const LOADING_SPINNER_ID = "loadingSpinnerId";
export const NAME_TEXTAREA_ID = "nameTextAreaId";
export const DESCRIPTION_TEXTAREA_ID = "descriptionTextareaId";

/**
 * Ссылки
 */
export const BACK_URL = "http://localhost:80"
export const AUTH_URL = BACK_URL + "/api/auth/";

/**
 * Прочее
 */
export const TO_DO_TASK_STATUS = "TO_DO";
export const DONE_TASK_STATUS = "DONE";
export const NO_ELEMENTS_DIV = (<div className="empty-list-label">Нет элементов</div>)
export const NO_TASKS_DIV = (<div className="empty-task-list-label">Нет элементов</div>)
export const NO_CATEGORIES_VALUE = "Не найдено";

export const PRIORITY_2_DEFINITION_PLURAL = {
    "A":"Важные и срочные",
    "B":"Важные и несрочные",
    "C":"Неважные и срочные",
    "D":"Неважные и несрочные"
};

export const PRIORITY_2_DEFINITION = {
    "A":"Важная и срочная",
    "B":"Важная и несрочная",
    "C":"Неважная и срочная",
    "D":"Неважная и несрочная"
};

