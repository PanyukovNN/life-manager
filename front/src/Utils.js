import {useEffect} from 'react';

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

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            };

            fetch("http://localhost:80/api/category/find-list", requestOptions)
                .then((response) => {
                    if (!response.ok) {
                        throw response;
                    }

                    return response;
                })
                .then(res => res.json().then(rawCategories => {
                    setCategories(rawCategories);
                    setLoading(false);
                }))
                .catch((response) => {
                    response.text().then(message => alert.show(message));
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
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    };

    return await fetch(link, requestOptions);
}
