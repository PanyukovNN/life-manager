import {END_DONE_DATE_SELECT_ID, START_DONE_DATE_SELECT_ID} from "../Constants";

/**
 * Получить выбранную в селекторе категорию
 */
export function getStartDoneDate() {
    let dateSelectorElement = document.getElementById(START_DONE_DATE_SELECT_ID);

    if (dateSelectorElement === null) {
        return null;
    }

    return dateSelectorElement.value;
}

/**
 * Получить выбранную в селекторе категорию
 */
export function getEndDoneDate() {
    let dateSelectorElement = document.getElementById(END_DONE_DATE_SELECT_ID);

    if (dateSelectorElement === null) {
        return null;
    }

    return dateSelectorElement.value;
}
