import {useEffect, useState} from 'react';

/**
 * Запрашивает с сервера список категорий и возвращает его
 *
 * @returns карта категорий
 */
export function FetchCategories() {
    const [categories, setCategories] = useState({});

    useEffect(
        () => {
            return () =>  fetch("http://localhost:80/api/category/find-all")
                    .then(res => res.json())
                    .then(data => {
                        setCategories(() => {
                            let categoryMap = {};
                            data.forEach(category => categoryMap[category.name] = category.name);

                            return categoryMap;
                        })
                    })
        },
        []);

    return categories;
}
