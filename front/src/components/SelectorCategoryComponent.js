import '../App.css';
import {useEffect, useState} from 'react';
import {SelectorComponent} from './SelectorComponent'

/**
 * Компонент селектора с предзагрузкой
 *
 * @param storageKey ключ локального хранилища
 * @param header заголовок селектора
 * @returns {*} селектор
 * @constructor
 */
export const SelectorCategoryComponent = ({storageKey, header}) => {

    const [optionsMap, setOptionsMap] = useState({});
    useEffect(
        () => {
            const fetchCategories = async () => {
                const response = await fetch("http://localhost:80/api/category/find-all")
                const data = await response.json();

                setOptionsMap(() => {
                    let optionsMap = {};
                    data.forEach(category => optionsMap[category.name] = category.name);

                    return optionsMap;
                })
            }
            fetchCategories();
        },
        []);

    return (
        <SelectorComponent
            storageKey={storageKey}
            header={header}
            optionMap={optionsMap}/>
    )
}
