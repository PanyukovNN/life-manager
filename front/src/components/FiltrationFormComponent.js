import '../App.css';
import {React} from 'react';
import {SelectorComponent} from './SelectorComponent'
import {SelectorCategoryComponent} from './SelectorCategoryComponent'
import {CATEGORY_KEY, PRIORITY_KEY, PERIOD_KEY, SORT_ORDER_KEY} from '../Constants'

/**
 * Параметры поиска задач
 *
 * @returns {*} селекторы с параметров поиска
 * @constructor
 */
export const FiltrationForm = ({refreshTaskList}) => {
    return (
        <>
            {/* Селектор категорий */}
            <SelectorCategoryComponent
                storageKey={CATEGORY_KEY}
                header={"Раздел:"}
                notifySelection={() => refreshTaskList()}/>

            {/* Селектор приоритета */}
            <SelectorComponent
                storageKey={PRIORITY_KEY}
                header={"Приоритет:"}
                optionMap={{"" : "Любой",
                    "A" : "A",
                    "B" : "B",
                    "C" : "C",
                    "D" : "D"}}
                notifySelection={() => refreshTaskList()}/>

            {/* Селектор периода */}
            <SelectorComponent
                storageKey={PERIOD_KEY}
                header={"За период:"}
                optionMap={{"ALL" : "Все время",
                    "DAY"   : "День",
                    "WEEK"  : "Неделя",
                    "MONTH" : "Месяц"}}
                notifySelection={() => refreshTaskList()}/>

            {/* Селектор сортировки */}
            <SelectorComponent
                storageKey={SORT_ORDER_KEY}
                header={"Сортировать по:"}
                optionMap={{
                    "PRIORITY_FIRST"        : "Приоритету",
                    "DATE_COMPLETION_FIRST" : "Дате исполнения",
                    "DATE_ADDED_FIRST"      : "Дате добавления"}}
                notifySelection={() => refreshTaskList()}/>
        </>
    )
}
