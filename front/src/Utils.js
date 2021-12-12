import {React, useEffect, useState} from 'react';

/**
 * Запрашивает с сервера список категорий и возвращает его
 *
 * @param setLoading изменить хук загрузки страницы
 * @returns объекты категорий
 */
export function FetchRawCategories(setLoading) {
    const [categories, setCategories] = useState({});

    useEffect(
        () => {
            fetch("http://localhost:80/api/category/find-all")
                .then(res => res.json())
                .then(data => {
                    setCategories(data);
                    setLoading(false);
                })
        },
        []);

    return categories;
}

/**
 * Преобразует объекты категорий в карту, где и ключом и значением выступает имя категории
 *
 * @param rawCategories изменить хук загрузки страницы
 * @returns карта категорий
 */
export function ConvertRawCategoriesToMap(rawCategories) {
    let categoryMap = {};
    rawCategories.forEach(category => categoryMap[category.name] = category.name);

    return categoryMap;
}
