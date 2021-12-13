import '../../App.css';
import {Category} from "./Category";
import {FetchRawCategories} from "../../Utils";
import {React, useEffect, useState} from 'react';

export const CategoryListComponent = ({refreshCategoryListCall}) => {

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
                              key={category.id} />
                ));

                return categoryComponents;
            });

            // const fetchCategories = async () => {
            //     fetch("http://localhost:80/api/category/find-unarchived")
            //         .then(res => res.json())
            //         .then(categories => {
            //             setCategoryComponents(() => {
            //                 let categoryComponents = [];
            //
            //                 categories.forEach(category => categoryComponents.push(
            //                     <Category category={category}
            //                               key={category.id} />
            //                 ));
            //
            //                 return categoryComponents;
            //             });
            //         })
            // }
            // fetchCategories();
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
