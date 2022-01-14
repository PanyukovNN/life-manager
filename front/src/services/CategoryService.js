import {useEffect} from "react";
import {postReq} from "./RequestService";
import {CATEGORY_SELECT_ID} from "../Constants";
import {setLoadingStart, setLoadingStop} from "./Util";

/**
 * Запрашивает с сервера список категорий и возвращает его
 *
 * @param setCategories задать список объектов категорий
 * @param call хук загрузки категорий
 * @param inArchive флаг в/вне архива
 * @param alert всплывающее окно
 * @returns объекты категорий
 */
export function FetchRawCategories(setCategories, call, inArchive, alert) {
    useEffect(
        () => {
            setLoadingStart();

            let body = {
                inArchive: inArchive === undefined ? false : inArchive.inArchive
            };

            postReq("http://localhost:80/api/category/find-list", body, alert)
                .then((response) => {
                        if (response === null) {
                            return;
                        }

                        setCategories(response.data);
                        setLoadingStop();
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

/**
 * Получить выбранную в селекторе категорию
 */
export function getCurrentCategory() {
    return document.getElementById(CATEGORY_SELECT_ID).selectedOptions[0].value;
}
