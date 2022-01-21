import {deleteReq, postReq} from "./RequestService";
import {CATEGORY_SELECT_ID} from "../Constants";
import {showAlert} from "./AlertService";

/**
 * Запрашивает с сервера список категорий и возвращает его
 *
 * @param recentlyDeleted флаг 'недавно удаленные'
 * @returns результат выполнения запроса к серверу
 */
export function fetchRawCategories(recentlyDeleted) {
    let body = {
        recentlyDeleted: recentlyDeleted
    };

    return postReq("http://localhost:80/api/category/find-list", body)
        .then((response) => {
            if (response && response.data) {
                return response.data;
            }

            return [];
        });
}

/**
 * Переместить категори в недавно удаленные
 *
 * @param category категория
 * @returns результат выполнения запроса к серверу
 */
export function moveToRecentlyDeleted(category) {
    let result = window.confirm("Вы уверены, что хотите удалить категорию \"" + category.name + "\" вместе с закрепленными задачами?");

    if (!result) {
        return Promise.resolve();
    }

    let body = {
        id: category.id,
    };

    return postReq("http://localhost:80/api/category/move-to-recently-deleted", body)
        .then(response => {
            if (response && response.data) {
                showAlert(response.data)
            }
        });
}

/**
 * Восстановить категорию из недавно удаленных
 *
 * @param id идентификатор категории
 * @returns результат выполнения запроса к серверу
 */
export function recoverFromRecentlyDeleted(id) {
    let body = {
        id: id,
    };

    return postReq("http://localhost:80/api/category/recover-from-recently-deleted", body)
        .then(response => {
            if (response && response.data) {
                showAlert(response.data)
            }
        });
}


/**
 * Удалить категорию
 *
 * @param category категория
 * @returns результат выполнения запроса
 */
export function removeCategory(category) {
    let result = window.confirm("Вы уверены, что хотите окончательно удалить категорию \"" + category.name + "\" и её задачи?");

    if (!result) {
        return Promise.resolve();
    }

    let body = {
        id: category.id
    };

    return deleteReq("http://localhost:80/api/category/delete-permanently-by-id", body)
        .then(response => {
            if (response && response.data) {
                showAlert(response.data)
            }
        });
}

/**
 * Создать/обновить категорию
 *
 * @param id идентификатор
 * @param name наименование
 * @returns результат выполнения запроса
 */
export function createUpdateCategory(id, name) {
    if (name === null || name === "") {
        return;
    }

    let body = {
        id: id,
        name: name
    };

    return postReq('http://localhost:80/api/category/create-update', body)
        .then(response => {
            if (response && response.data) {
                showAlert(response.data)
            }
        })
}

/**
 * Преобразует объекты категорий в карту, где и ключом и значением выступает наименование категории
 *
 * @param rawCategories объекты категорий
 * @returns карта категорий
 */
export function convertRawCategoriesToMap(rawCategories) {
    let categoryMap = {};
    rawCategories.forEach(category => categoryMap[category.name] = category.name);

    return categoryMap;
}

/**
 * Получить выбранную в селекторе категорию
 */
export function getCurrentCategory() {
    return document.getElementById(CATEGORY_SELECT_ID).selectedOptions[0].value;
}
