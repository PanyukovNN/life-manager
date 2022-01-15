import {React} from 'react'
import {BaseCategoryListPage} from "./BaseCategoryListPage";

/**
 * Страница управления разделами вне архива
 *
 * @returns {*} страница управления разделами вне архива
 * @constructor
 */
export const CategoryListPage = () => {

    return (
        <BaseCategoryListPage inArchive={false}/>
    );
}
