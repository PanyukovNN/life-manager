import {useEffect, useState} from 'react';

/**
 * Запрашивает с сервера список категорий и возвращает его
 *
 * @returns карту категорий
 */
export function FetchCategories() {
    const [categories, setCategories] = useState({});

    useEffect(
        () => {
            const fetchCategories = async () => {
                const response = await fetch("http://localhost:80/api/category/find-all")
                const data = await response.json();

                setCategories(() => {
                    let categoryMap = {};
                    data.forEach(category => categoryMap[category.name] = category.name);

                    return categoryMap;
                })
            }
            fetchCategories();
        },
        []);

    return categories;
}
