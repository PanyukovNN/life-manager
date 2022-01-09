import {React} from 'react'
import {BaseCategoryListPage} from "./BaseCategoryListPage";

/**
 * Страница управления разделами в архиве
 *
 * @param spinnerCall хук показа спиннера загрузки
 * @returns {*} страница управления разделами в архиве
 * @constructor
 */
export const ArchiveCategoryListPage = ({showSpinner}) => {

    return (
        <BaseCategoryListPage
            inArchive={true}
            showSpinner={showSpinner}/>
    );
}
