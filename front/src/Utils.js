import {useEffect, useState} from 'react';

/**
 * Запрашивает с сервера список категорий и возвращает его
 *
 * @param setLoading изменить хук загрузки страницы
 * @returns карта категорий
 */
export function FetchCategories(setLoading) {
    const [categories, setCategories] = useState({});

    useEffect(
        () => {
            fetch("http://localhost:80/api/category/find-all")
                .then(res => res.json())
                .then(data => {

                    setCategories(() => {
                        let categoryMap = {};
                        data.forEach(category => categoryMap[category.name] = category.name);

                        return categoryMap;
                    })

                    setLoading(false);
                })
        },
        []);

    return categories;
}
