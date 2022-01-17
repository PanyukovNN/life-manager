import '../../App.css';
import {NO_ELEMENTS_DIV} from '../../Constants'
import {Category} from "./Category";
import {fetchRawCategories} from "../../services/CategoryService";
import {React, useEffect, useState} from 'react';
import {setLoadingStart, setLoadingStop} from "../../services/Util";

/**
 * Компонент со списком категорий.
 *
 * @param refreshCategoryListCall хук обновления списка разделов
 * @param editCategory функция уведомления о клике на кнопку "редактировать" категории
 * @param moveCategoryToRecentlyDeleted фукнция уведомления о клике на кнопку "поместить в недавно удаленные"
 * @param recoverCategoryFromRecentlyDeleted фукнция уведомления о клике на кнопку "восстановить из недавно удаленных"
 * @param removeCategory функция уведомления о клике на кнопку "удалить" категории
 * @param recentlyDeleted флаг 'недавно удаленные'
 * @param categoryLoadingFinishedCall функция вызываемая при окончании загрузки
 * @returns компонент со списком разделов
 */
export const CategoryListComponent = ({refreshCategoryListCall,
                                          editCategory,
                                          moveCategoryToRecentlyDeleted,
                                          recoverCategoryFromRecentlyDeleted,
                                          removeCategory,
                                          recentlyDeleted}) => {
    const [categoryComponents, setCategoryComponents] = useState([]);

    useEffect(
        () => {
            setLoadingStart(true);

            fetchRawCategories(recentlyDeleted)
                .then(rawCategories => {
                    if (!rawCategories || rawCategories.length === 0) {
                        setCategoryComponents([NO_ELEMENTS_DIV]);
                        setLoadingStop();

                        return;
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
                      editCategory={editCategory}
                      moveCategoryToRecentlyDeleted={moveCategoryToRecentlyDeleted}
                      recoverCategoryFromRecentlyDeleted={recoverCategoryFromRecentlyDeleted}
                      removeCategory={removeCategory}
                      recentlyDeleted={recentlyDeleted}
                      key={category.id} />)
    }

    return (
        <div className="task-components-wrap">
            {categoryComponents}
        </div>
    )
}
