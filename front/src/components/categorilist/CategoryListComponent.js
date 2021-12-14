import '../../App.css';
import {Category} from "./Category";
import {FetchRawCategories} from "../../Utils";
import {React, useEffect, useState} from 'react';

/**
 * Компонент со списком разделов
 *
 * @param refreshCategoryListCall хук обновления списка разделов
 * @param notifyUpdateCategoryClick функция уведомления о клике на кнопку "редактировать" категории
 * @param notifyToArchiveCategoryClick фукнция уведомления о клике на кнопку "в архив" категории
 * @param notifyRemoveCategoryClick функция уведомления о клике на кнопку "удалить" категории
 * @param inArchive флаг в/вне архива
 * @returns {*} компонент со списком разделов
 * @constructor
 */
export const CategoryListComponent = ({refreshCategoryListCall, notifyUpdateCategoryClick, notifyToArchiveCategoryClick, notifyRemoveCategoryClick, inArchive}) => {

    const [categoryComponents, setCategoryComponents] = useState([]);
    const [rawCategories, setRawCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    FetchRawCategories(setLoading, setRawCategories, refreshCategoryListCall, inArchive);

    useEffect(
        () => {
            if (loading) {
                return;
            }

            setCategoryComponents(() => {
                let categoryComponents = [];

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
