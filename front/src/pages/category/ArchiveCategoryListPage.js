import {React} from 'react'
import {BaseCategoryListPage} from "./BaseCategoryListPage";

/**
 * Страница управления разделами в архиве
 *
 * @returns {*} страница управления разделами в архиве
 * @constructor
 */
export const ArchiveCategoryListPage = () => {

    return (
        <BaseCategoryListPage
            inArchive={true}/>
    );
}
