import '../../App.css';
import {Category} from "./Category";
import {FetchRawCategories} from "../../Utils";
import {React, useEffect, useState} from 'react';

export const CategoryListComponent = ({refreshCategoryListCall, notifyUpdateCategoryClick}) => {

    const [categoryComponents, setCategoryComponents] = useState([]);
    const [rawCategories, setRawCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    FetchRawCategories(setLoading, setRawCategories, refreshCategoryListCall);

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
                              key={category.id} />
                ));

                return categoryComponents;
            });
        },
        [loading]
    )

    return (
        <>
            <div className="task-components-wrap">
                {categoryComponents}
            </div>
        </>
    )
}
