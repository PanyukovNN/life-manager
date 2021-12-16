import {useEffect} from 'react';

/**
 * Запрашивает с сервера список категорий и возвращает его
 *
 * @param setLoading задать флаг загрузки страницы
 * @param setCategories задать список объектов категорий
 * @param call хук загрузки категорий
 * @param inArchive флаг в/вне архива
 * @returns объекты категорий
 */
export function FetchRawCategories(setLoading, setCategories, call, inArchive) {
    useEffect(
        () => {
            setLoading(true);

            console.log(inArchive)
            let body = {
                inArchive: inArchive === undefined ? false : inArchive.inArchive
            };

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            };

            fetch("http://localhost:80/api/category/find-list", requestOptions)
                .then(res => res.json())
                .then(data => {
                    setCategories(data);
                    setLoading(false);
                })
        },
        [call]);
}

/**
 * Запрашивает с сервера список категорий и возвращает его
 * При этом преобразует объекты категорий в карту, где и ключом и значением выступает наименование
 *
 * @param setLoading задать флаг загрузки страницы
 * @param setCategories задать список объектов категорий
 * @returns карта категорий
 */
export function FetchCategoriesMap(setLoading, setCategories) {
    FetchRawCategories(setLoading, (categories) => {
        let categoryMap = {};

        categories.forEach(category => categoryMap[category.name] = category.name);
        setCategories(categoryMap);
    });
}

/**
 * Отправить запрос на сервер
 *
 * @param method метод
 * @param body тело
 * @param link ссылка
 * @returns {Promise<any>} ответ от сервера в json формате
 * @constructor
 */
export async function SendRequest(method, body, link) {
    const requestOptions = {
        method: method,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    };

    const response = await fetch(link, requestOptions);

    return await response;
}
