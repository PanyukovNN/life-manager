
import {useEffect} from 'react';
import getAccessToken from "./services/AuthHeader";
import axios from "axios";

/**
 * Запрашивает с сервера список категорий и возвращает его
 *
 * @param setLoading задать флаг загрузки страницы
 * @param setCategories задать список объектов категорий
 * @param call хук загрузки категорий
 * @param inArchive флаг в/вне архива
 * @param alert всплывающее окно
 * @returns объекты категорий
 */
export function FetchRawCategories(setLoading, setCategories, call, inArchive, alert) {
    useEffect(
        () => {
            setLoading(true);

            let body = {
                inArchive: inArchive === undefined ? false : inArchive.inArchive
            };

            axios
                .post("http://localhost:80/api/category/find-list",
                    JSON.stringify(body),
                    {
                        headers : {'Authorization': getAccessToken(), 'Content-Type': 'application/json'}
                    })
                .then((response) => {
                    if (response.status !== 200) {
                        throw response;
                    }

                    setCategories(response.data);
                    setLoading(false);

                    return response;
                })
                .catch((error) => {
                    alert.show(error.response.data.message)
                });
        },
        [call]);
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
 * Отправить запрос на сервер
 *
 * @param method метод
 * @param body тело
 * @param link ссылка
 * @param alert компонент всплывающего окна
 * @returns {Promise<any>} ответ от сервера
 * @constructor
 */
export async function SendRequest(method, body, link, alert) {
    const requestOptions = {
        method: method,
        headers: { Authorization: getAccessToken(), 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };

    return await fetch(link, requestOptions);
}
