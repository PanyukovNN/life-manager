import '../App.css';
import {Form} from "react-bootstrap";
import {React, useEffect, useState} from 'react';

/**
 * Компонент селектора
 *
 * @param storageKey ключ локального хранилища
 * @param header заголовок селектора
 * @param optionMap карта опций выбора
 * @returns {*} селектор
 * @constructor
 */
export const SelectorComponent = ({storageKey, header, optionMap, notifySelection}) => {

    // Сохраняем/читаем значение из локального хранилица
    const [selected, setSelected] = useState([]);
    const handleSelected = (e) => {
        let {name, value} = e.target;
        localStorage.setItem(storageKey, JSON.stringify(value));

        setSelected(value);
        notifySelection();
    }
    useEffect(() => {
            const storedSortOrder = JSON.parse(
                localStorage.getItem(storageKey) ?? "[]"
            );
            setSelected(storedSortOrder);
        },
        []);

    // Формируем варианты выбора
    let options = [];
    for (const [key, value] of Object.entries(optionMap)) {
        options.push(<option value={key}>{value}</option>)
    }

    return (
        <div className="selector-block">
            <div className="selector-header">
                {header}
            </div>
            <div className="selector-wrapper">
                <Form.Select size="1"
                             value={selected}
                             onChange={handleSelected}>
                    {options}
                </Form.Select>
            </div>
        </div>
    )
}
