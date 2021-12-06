import '../App.css';
import {Form} from "react-bootstrap";
import {React, useEffect, useState} from 'react';

/**
 * Компонент селектора
 *
 * @param id html идентификатор селектора
 * @param storageKey ключ локального хранилища
 * @param optionMap карта опций выбора
 * @param notifySelection функция, вызываемая при изменении значения
 * @returns {*} селектор
 * @constructor
 */
export const SelectorComponent = ({id, storageKey, optionMap, notifySelection}) => {

    // Сохраняем/читаем значение из локального хранилица
    const [selected, setSelected] = useState([]);
    const handleSelected = (e) => {
        let {name, value} = e.target;
        if (storageKey !== null) {
            localStorage.setItem(storageKey, JSON.stringify(value));
        }

        setSelected(value);
        notifySelection(value);
    }
    useEffect(() => {
        if (storageKey !== null) {
            const storedSortOrder = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
            setSelected(storedSortOrder);
        }
    },
    []);

    // Формируем варианты выбора
    let options = [];
    for (const [key, value] of Object.entries(optionMap)) {
        options.push(<option value={key}>{value}</option>)
    }

    return (
        <>
            <Form.Select id={id}
                         size="1"
                         value={selected}
                         onChange={handleSelected}>
                {options}
            </Form.Select>
        </>
    )
}
