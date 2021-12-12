import '../App.css';
import {React, useState} from 'react'
import {FetchRawCategories} from "../Utils";
import {CategoryListComponent} from "../components/categorilist/CategoryListComponent";

/**
 * Главная страница со списком задачи и формой фильтрации
 *
 * @returns {*} главная страница со списком задач
 * @constructor
 */
export const CategoryListPage = () => {

    const [loading, setLoading] = useState(true);
    const rawCategories = FetchRawCategories(setLoading);

    const [refreshCategoryListCall, setRefreshCategoryListCall] = useState(0);

    if (loading) {
        return (
            <span>Loading...</span>
        );
    }

    return (
        <div className="CategoryListPage">
            <div className="category-list-block">
                <CategoryListComponent
                    categories={rawCategories}
                    refreshCategoryListCall={refreshCategoryListCall}/>
            </div>
        </div>
    );
}
