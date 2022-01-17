import {React} from 'react'
import {BaseCategoryListPage} from "./BaseCategoryListPage";

/**
 * Страница управления категориями.
 *
 * @returns страница управления разделами
 */
export const CategoryListPage = () => {

    return (
        <BaseCategoryListPage recentlyDeleted={false}/>
    );
}
