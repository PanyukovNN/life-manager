import {deleteReq, postReq} from "./RequestService";
import {CATEGORY_SELECT_ID} from "../Constants";
import {showAlert} from "./AlertService";

/**
 * Запрашивает с сервера список категорий и возвращает его
 *
 * @param inArchive флаг в/вне архива
 * @returns результат выполнения запроса к серверу
 */
export function fetchRawCategories(inArchive) {
    let body = {
        inArchive: inArchive
    };

    return postReq("http://localhost:80/api/category/find-list", body)
        .then((response) => {
            if (response && response.data) {
                return response.data;
            }

            return null;
        });
}

/**
 * Переместить категори в/вне архива
 *
 * @param name имя категории
 * @param inArchive флаг в/вне архива, куда перенести
 * @returns результат выполнения запроса к серверу
 */
export function moveToFromArchive(name, inArchive) {
    let body = {
        name: name,
        inArchive: inArchive
    };

    return postReq("http://localhost:80/api/category/set-in-archive", body)
        .then(response => {
            if (response && response.data) {
                showAlert(response.data)
            }
        });
}

/**
 * Удалить категорию
 *
 * @param name имя категории
 * @returns {*}
 */
export function removeCategory(name) {
    let result = window.confirm("Вы уверены, что хотите удалить категорию \"" + removeCategory.name + "\"?");

    if (!result) {
        return;
    }

    let body = {
        name: name
    };

    return deleteReq("http://localhost:80/api/category/delete-by-name", body)
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
 * Преобразует объекты категорий в карту, где и ключом и значением выступает наименование
 *
 * @param rawCategories объекты категорий
 * @returns {{}}
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
