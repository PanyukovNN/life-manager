
/**
 * Вспылвающее окно (необходимо проинициализировать при старте программы)
 */
let alert = null;

export function setAlert(alertToSet) {
    alert = alertToSet;
}

/**
 * Показать всплывающее окно
 *
 * @param message сообщение
 */
export function showAlert(message) {
    alert.show(message);
}
