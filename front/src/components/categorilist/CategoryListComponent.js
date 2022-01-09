import '../../App.css';
import {NO_ELEMENTS_DIV} from '../../Constants'
import {Category} from "./Category";
import {FetchRawCategories} from "../../services/CategoryService";
import {React, useEffect, useState} from 'react';
import {useAlert} from "react-alert";

/**
 * Компонент со списком разделов
 *
 * @param refreshCategoryListCall хук обновления списка разделов
 * @param notifyUpdateCategoryClick функция уведомления о клике на кнопку "редактировать" категории
 * @param notifyToArchiveCategoryClick фукнция уведомления о клике на кнопку "в архив" категории
 * @param notifyRemoveCategoryClick функция уведомления о клике на кнопку "удалить" категории
 * @param inArchive флаг в/вне архива
 * @param spinnerCall хук показа спиннера загрузки
 * @returns {*} компонент со списком разделов
 * @constructor
 */
export const CategoryListComponent = ({refreshCategoryListCall,
                                          notifyUpdateCategoryClick,
                                          notifyToArchiveCategoryClick,
                                          notifyRemoveCategoryClick,
                                          inArchive,
                                          showSpinner}) => {

    const alert = useAlert();
    const [categoryComponents, setCategoryComponents] = useState([]);
    const [rawCategories, setRawCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    FetchRawCategories(setLoading,
        setRawCategories,
        refreshCategoryListCall,
        {inArchive : inArchive},
        alert);

    useEffect(
        () => {
            if (loading) {
                showSpinner(true);
                return;
            }

            setCategoryComponents(() => {
                let categoryComponents = [];

                if (rawCategories.length === 0) {
                    return NO_ELEMENTS_DIV;
                }

                rawCategories.forEach(category => categoryComponents.push(
                    <Category category={category}
                              notifyEditBtnClick={notifyUpdateCategoryClick}
                              notifyMoveToArchiveClick={notifyToArchiveCategoryClick}
                              notifyRemoveClick={notifyRemoveCategoryClick}
                              inArchive={inArchive}
                              key={category.id} />
                ));

                return categoryComponents;
            });

            showSpinner(false);
        },
        [loading]
    );

    return (
        <>
            <div className="task-components-wrap">
                {categoryComponents}
            </div>
        </>
    )
}
