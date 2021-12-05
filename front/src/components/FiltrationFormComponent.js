import '../App.css';
import {React} from 'react';
import {SelectorComponent} from './SelectorComponent'
import {SelectorCategoryComponent} from './SelectorCategoryComponent'
import {CATEGORY_KEY, PRIORITY_KEY, PERIOD_KEY, SORT_ORDER_KEY} from '../Constants'

/**
 * Параметры поиска задач
 *
 * @param notifyRefresh функция, вызываемая при обновлении любого из селекторов
 * @returns {*} селекторы с параметров поиска
 * @constructor
 */
export const FiltrationForm = ({notifyRefresh}) => {
    return (
        <>
            {/* Селектор категорий */}
            <div className="selector-block">
                <div className="selector-header">Раздел:</div>
                <div className="selector-wrapper">
                    <SelectorCategoryComponent
                        storageKey={CATEGORY_KEY}
                        notifySelection={() => notifyRefresh()}/>
                </div>
            </div>

            {/* Селектор приоритета */}
            <div className="selector-block">
                <div className="selector-header">Приоритет:</div>
                <div className="selector-wrapper">
                    <SelectorComponent
                        storageKey={PRIORITY_KEY}
                        optionMap={{"" : "Любой",
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
                        storageKey={SORT_ORDER_KEY}
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
