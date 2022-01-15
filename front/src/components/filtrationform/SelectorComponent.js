import '../../App.css';
import {Form} from "react-bootstrap";
import {React, useEffect, useState} from 'react';

/**
 * Компонент селектора формы фильтрации
 *
 * @param id html идентификатор селектора
 * @param storageKey ключ локального хранилища
 * @param optionMap карта опций выбора
 * @param notifySelection функция, вызываемая при изменении значения
 * @param defaultValue значение по умолчанию
 * @param disabled флаг отключения селектора
 * @returns селектор
 */
export const SelectorComponent = ({id,
                                      storageKey,
                                      optionMap,
                                      notifySelection,
                                      defaultValue,
                                      disabled}) => {

    // Варианты выбора
    const [options, setOptions] = useState([]);

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
            let optionsFromServer = [];
            for (const [key, value] of Object.entries(optionMap)) {
                optionsFromServer.push(<option value={key}>{value}</option>)
            }
            setOptions(optionsFromServer);

            if (storageKey !== undefined) {
                const storedValue = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
                setSelected(storedValue);
            } else {
                setSelected(defaultValue);
            }
        },
        [optionMap]
    );

    return (
        <>
            <Form.Select id={id}
                         size="1"
                         disabled={disabled}
                         value={selected}
                         onChange={handleSelected}>
                {options}
            </Form.Select>
        </>
    )
}
