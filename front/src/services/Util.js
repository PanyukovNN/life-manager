import {LOADING_SPINNER_ID} from "../Constants";

/**
 * Показать спиннер загрузки
 */
export function setLoadingStart() {
    document.getElementById(LOADING_SPINNER_ID).classList.toggle("show");
}

/**
 * Получить скрыть спиннер загрузки
 */
export function setLoadingStop() {
    document.getElementById(LOADING_SPINNER_ID).classList.remove("show");
}

/**
 * Показывается ли спиннер в текущий момент
 *
 * @returns показывается ли спиннер
 */
export function isLoading() {
    return document.getElementById(LOADING_SPINNER_ID).classList.contains("show");
}
