import '../../App.css';
import {React, useEffect, useState} from 'react';
import {SelectorComponent} from './SelectorComponent'
import {CATEGORY_KEY, CATEGORY_SELECT_ID,} from '../../Constants'
import {convertRawCategoriesToMap, fetchRawCategories} from "../../services/CategoryService";

/**
 * Параметры поиска задач
 *
 * @param notifyRefresh уведомление об обновлении формы
 * @returns {*} селекторы с параметров поиска
 * @constructor
 */
export const FiltrationForm = ({notifyRefresh}) => {
    const loadingCategories = {"": "Загрузка..."};
    const [categories, setCategories] = useState(loadingCategories);

    useEffect(() => {
            fetchRawCategories(false)
                .then(rawCategories => {
                    let categoriesFromServer = convertRawCategoriesToMap(rawCategories);
                    setCategories(categoriesFromServer);

                    notifyRefresh();
                }
            );
        },
        []);

    return (
        <>
            <div className="selectors-group">
                {/* Селектор категорий */}
                <div className="selector-wrap">
                    <div className="selector-header">Раздел:</div>
                    <div className="selector-wrapper">
                        <SelectorComponent
                            id={CATEGORY_SELECT_ID}
                            disabled={categories === loadingCategories}
                            storageKey={CATEGORY_KEY}
                            optionMap={categories}
                            notifySelection={notifyRefresh}/>
                    </div>
                </div>
            </div>
        </>
    )
}
