import {useEffect} from "react";
import {postReq} from "./RequestService";

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

            postReq("http://localhost:80/api/category/find-list", body, alert)
                .then((response) => {
                        if (response === null) {
                            return;
                        }

                        setCategories(response.data);
                        setLoading(false);
                    }
                );
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
