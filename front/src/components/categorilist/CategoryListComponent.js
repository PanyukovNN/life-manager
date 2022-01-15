import '../../App.css';
import {NO_ELEMENTS_DIV} from '../../Constants'
import {Category} from "./Category";
import {fetchRawCategories} from "../../services/CategoryService";
import {React, useEffect, useState} from 'react';
import {setLoadingStart, setLoadingStop} from "../../services/Util";

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
export const CategoryListComponent = ({refreshCategoryListCall,
                                          notifyUpdateCategoryClick,
                                          notifyToArchiveCategoryClick,
                                          notifyRemoveCategoryClick,
                                          inArchive}) => {
    const [categoryComponents, setCategoryComponents] = useState([]);

    useEffect(
        () => {
            setLoadingStart(true);

            fetchRawCategories(inArchive)
                .then(rawCategories => {
                    if (!rawCategories || rawCategories.length === 0) {
                        return [NO_ELEMENTS_DIV];
                    }

                    let renderedCategoryComponents = [];
                    rawCategories.forEach(category => renderedCategoryComponents.push(
                        renderCategory(category)
                    ));

                    setCategoryComponents(renderedCategoryComponents);

                    setLoadingStop();
                });
        },
        [refreshCategoryListCall]
    );

    const renderCategory = (category) => {
        return (
            <Category category={category}
                      notifyEditBtnClick={notifyUpdateCategoryClick}
                      notifyMoveToArchiveClick={notifyToArchiveCategoryClick}
                      notifyRemoveClick={notifyRemoveCategoryClick}
                      inArchive={inArchive}
                      key={category.id} />)
    }

    return (
        <>
            <div className="task-components-wrap">
                {categoryComponents}
            </div>
        </>
    )
}
