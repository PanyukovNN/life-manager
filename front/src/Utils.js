import {useEffect} from 'react';

/**
 * Запрашивает с сервера список категорий и возвращает его
 *
 * @param setLoading задать флаг загрузки страницы
 * @param setCategories задать список объектов категорий
 * @param call хук загрузки категорий
 * @returns объекты категорий
 */
export function FetchRawCategories(setLoading, setCategories, call) {
    useEffect(
        () => {
            setLoading(true);
            fetch("http://localhost:80/api/category/find-unarchived")
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
