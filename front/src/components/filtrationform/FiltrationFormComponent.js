import '../../App.css';
import {React, useEffect} from 'react';
import {SelectorComponent} from './SelectorComponent'
import {
    CATEGORY_KEY,
    CATEGORY_SELECT_ID,
    COMPARE_TO_KEY,
    COMPARE_TO_SELECT_ID
} from '../../Constants'

/**
 * Параметры поиска задач
 *
 * @param notifyRefresh уведомление об обновлении формы
 * @param categories список категорий
 * @param loading флаг загрузки
 * @returns {*} селекторы с параметров поиска
 * @constructor
 */
export const FiltrationForm = ({notifyRefresh, categories, loading}) => {

    let categoriesWithDefault = {"": "Все"};
    for (const [key, value] of Object.entries(categories)) {
        categoriesWithDefault[key] = value;
    }

    useEffect(() => {
        notifyRefresh();
    }, [])

    return (
        <>
            <div className="selectors-group">
                {/* Селектор категорий */}
                <div className="selector-wrap">
                    <div className="selector-header">Раздел:</div>
                    <div className="selector-wrapper">
                        <SelectorComponent
                            id={CATEGORY_SELECT_ID}
                            disabled={loading}
                            storageKey={CATEGORY_KEY}
                            optionMap={categoriesWithDefault}
                            notifySelection={() => notifyRefresh()}/>
                    </div>
                </div>

                {/* Селектор сортировки */}
                <div className="selector-wrap">
                    <div className="selector-header">Сортировать по:</div>
                    <div className="selector-wrapper">
                        <SelectorComponent
                            id={COMPARE_TO_SELECT_ID}
                            storageKey={COMPARE_TO_KEY}
                            optionMap={{
                                "PRIORITY_FIRST": "Приоритету",
                                "DATE_PLANNED_FIRST": "Дате исполнения",
                                "DATE_ADDED_FIRST": "Дате добавления"
                            }}
                            notifySelection={() => notifyRefresh()}/>
                    </div>
                </div>
            </div>
        </>
    )
}
