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
 * @param defaultValue значение по умолчанию
 * @returns {*} селектор
 * @constructor
 */
export const SelectorComponent = ({id, storageKey, optionMap, notifySelection}) => {





    // Формируем варианты выбора
    let options = [];
    for (const [key, value] of Object.entries(optionMap)) {
        options.push(<option value={key}>{value}</option>)
    }

    // Сохраняем/читаем значение из локального хранилица
    const [selected, setSelected] = useState(optionMap[0]);
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
                const storedValue = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
                setSelected(storedValue);
                console.log("what ?" + storedValue)
                notifySelection(storedValue)
            } else {
                notifySelection(optionMap[0])
            }
        },
        []);

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
