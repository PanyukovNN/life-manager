import {React} from 'react'
import {BaseCategoryListPage} from "./BaseCategoryListPage";

/**
 * Страница управления разделами вне архива
 *
 * @param spinnerCall хук показа спиннера загрузки
 * @returns {*} страница управления разделами вне архива
 * @constructor
 */
export const CategoryListPage = ({showSpinner}) => {

    return (
        <BaseCategoryListPage
            inArchive={false}
            showSpinner={showSpinner}/>
    );
}
