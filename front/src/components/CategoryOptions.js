import '../App.css';
import {React, useEffect, useState} from 'react';

export const CategoryOptions = () => {
    const [categoryOptions, setCategoryOptions] = useState([<option></option>]);

    useEffect(
        () => {
            const fetchCategories = async () => {
                // запрашиваем список категорий
                const response = await fetch("http://localhost:80/api/category/find-all")
                const data = await response.json();

                // создаем функцию возврата элементов селектора в categoryOptions
                setCategoryOptions(() => {
                    let options = [];
                    data.forEach(category => options.push(
                        <option key={category.name} value={category.name}>{category.name}</option>
                    ));

                    return options;
                });
            }
            fetchCategories();
        },
        []
    );

    return (
        <>
            {categoryOptions}
        </>
    );
}
