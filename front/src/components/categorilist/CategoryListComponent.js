import '../../App.css';
import {Category} from "./Category";
import {React, useEffect, useState} from 'react';

export const CategoryListComponent = ({categories, refreshCategoryListCall}) => {

    const [categoryComponents, setCategoryComponents] = useState([]);

    useEffect(
        () => {

            console.log(categories)

            const fetchTasks = async () => {
                setCategoryComponents(() => {
                    let categoryComponents = [];
                    categories.forEach(category => categoryComponents.push(
                        <Category category={category}
                                  key={category.id} />
                    ));

                    return categoryComponents;
                });
            }

            fetchTasks();
        },
        [refreshCategoryListCall]
    );

    return (
        <>
            <div className="task-components-wrap">
                {categoryComponents}
            </div>
        </>
    )
}
