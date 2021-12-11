import '../App.css';
import {React, useEffect} from 'react';
import {SelectorComponent} from './SelectorComponent'
import {CATEGORY_SELECT_ID, PRIORITY_LETTER_SELECT_ID, PERIOD_SELECT_ID, COMPARE_TO_SELECT_ID,
    CATEGORY_KEY, PRIORITY_LETTER_KEY, PERIOD_KEY, COMPARE_TO_KEY} from '../Constants'

/**
 * Параметры поиска задач
 *
 * @param notifyRefresh уведомление об обновлении формы
 * @param categories список категорий
 * @returns {*} селекторы с параметров поиска
 * @constructor
 */
export const FiltrationForm = ({notifyRefresh, categories}) => {

    let categoriesWithDefault = {"" : "Все"};
    for (const [key, value] of Object.entries(categories)) {
        categoriesWithDefault[key] = value;
    }

    useEffect(() => {
        notifyRefresh();
    }, [])

    return (
        <>
            {/* Селектор категорий */}
            <div className="selector-block">
                <div className="selector-header">Раздел:</div>
                <div className="selector-wrapper">
                    <SelectorComponent
                        id={CATEGORY_SELECT_ID}
                        storageKey={CATEGORY_KEY}
                        optionMap={categoriesWithDefault}
                        notifySelection={() => notifyRefresh()}/>
                </div>
            </div>

            {/* Селектор приоритета */}
            <div className="selector-block">
                <div className="selector-header">Приоритет:</div>
                <div className="selector-wrapper">
                    <SelectorComponent
                        id={PRIORITY_LETTER_SELECT_ID}
                        storageKey={PRIORITY_LETTER_KEY}
                        optionMap={{"" : "Все",
                            "A" : "A",
                            "B" : "B",
                            "C" : "C",
                            "D" : "D"}}
                        notifySelection={() => notifyRefresh()}/>
                </div>
            </div>

            {/* Селектор периода */}
            <div className="selector-block">
                <div className="selector-header">За период:</div>
                <div className="selector-wrapper">
                    <SelectorComponent
                        id={PERIOD_SELECT_ID}
                        storageKey={PERIOD_KEY}
                        optionMap={{"ALL" : "Все время",
                            "DAY"   : "День",
                            "WEEK"  : "Неделя",
                            "MONTH" : "Месяц"}}
                        notifySelection={() => notifyRefresh()}/>
                </div>
            </div>


            {/* Селектор сортировки */}
            <div className="selector-block">
                <div className="selector-header">Сортировать по:</div>
                <div className="selector-wrapper">
                    <SelectorComponent
                        id={COMPARE_TO_SELECT_ID}
                        storageKey={COMPARE_TO_KEY}
                        optionMap={{
                            "PRIORITY_FIRST"        : "Приоритету",
                            "DATE_COMPLETION_FIRST" : "Дате исполнения",
                            "DATE_ADDED_FIRST"      : "Дате добавления"}}
                        notifySelection={() => notifyRefresh()}/>
                </div>
            </div>
        </>
    )
}
