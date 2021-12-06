import '../App.css';
import {React, useEffect, useState} from 'react';
import {SelectorComponent} from './SelectorComponent'

/**
 * Компонент селектора с предзагрузкой
 *
 * @param storageKey ключ локального хранилища
 * @param header заголовок селектора
 * @returns {*} селектор
 * @constructor
 */
export const SelectorCategoryComponent = ({storageKey, header, notifySelection}) => {

    return (
        <SelectorComponent
            storageKey={storageKey}
            header={header}
            optionMap={{"Работа" : "Работа"}}
            notifySelection={() => notifySelection()}/>
    )
}
