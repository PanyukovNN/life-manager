import '../../App.css';
import {React, useEffect, useState} from 'react';
import {SelectorComponent} from './SelectorComponent'
import {CATEGORY_KEY, CATEGORY_SELECT_ID, NO_CATEGORIES_VALUE,} from '../../Constants'
import {convertRawCategoriesToMap, fetchRawCategories} from "../../services/CategoryService";

/**
 * Параметры поиска задач
 *
 * @param notifyRefresh уведомление об обновлении формы
 * @returns селекторы с параметров поиска
 */
export const FiltrationForm = ({notifyRefresh}) => {
    const loadingCategories = {"": "Загрузка..."};
    const [formDisabled, setFormDisables] = useState(true);
    const [categories, setCategories] = useState(loadingCategories);

    useEffect(() => {
            fetchRawCategories(false)
                .then(rawCategories => {
                    if (rawCategories.length === 0) {
                        setCategories({"": NO_CATEGORIES_VALUE});
                        notifyRefresh();

                        return;
                    }

                    let categoriesFromServer = convertRawCategoriesToMap(rawCategories);
                    setCategories(categoriesFromServer);
                    setFormDisables(false);

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
                            disabled={formDisabled}
                            storageKey={CATEGORY_KEY}
                            optionMap={categories}
                            notifySelection={notifyRefresh}/>
                    </div>
                </div>
            </div>
        </>
    )
}
