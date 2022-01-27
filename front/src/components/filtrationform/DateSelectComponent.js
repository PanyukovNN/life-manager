import '../../App.css';
import {Form} from "react-bootstrap";
import {React, useEffect, useState} from 'react';

/**
 * Компонент селектора формы фильтрации
 *
 * @param id html идентификатор селектора
 * @param storageKey ключ локального хранилища
 * @param notifySelection функция, вызываемая при изменении значения
 * @param defaultValue значение по умолчанию
 * @param disabled флаг отключения селектора
 * @returns селектор
 */
export const DateSelectComponent = ({id,
                                      storageKey,
                                      notifySelection,
                                      defaultValue,
                                      disabled}) => {

    // Сохраняем/читаем значение из локального хранилица
    const [selectedDate, setSelectedDate] = useState();
    const handleSelected = (e) => {
        let {name, value} = e.target;
        if (storageKey !== null) {
            localStorage.setItem(storageKey, JSON.stringify(value));
        }

        setSelectedDate(value);
        notifySelection(value);
    }

    useEffect(() => {
            setSelectedDate(defaultValue);
        },
        []
    );

    return (
        <>
            <Form.Control
                id={id}
                type="date"
                size="1"
                disabled={disabled}
                value={selectedDate}
                onChange={handleSelected}/>
        </>
    )
}
