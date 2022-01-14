import {LOADING_SPINNER_ID} from "../Constants";

/**
 * Получить выбранную в селекторе категорию
 */
export function setLoadingStart() {
    return document.getElementById(LOADING_SPINNER_ID).classList.toggle("show");
}

/**
 * Получить выбранную в селекторе категорию
 */
export function setLoadingStop() {
    return document.getElementById(LOADING_SPINNER_ID).classList.remove("show");
}

export function isLoading() {
    return document.getElementById(LOADING_SPINNER_ID).classList.contains("show");
}
