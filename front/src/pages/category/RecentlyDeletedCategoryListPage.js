import {React} from 'react'
import {BaseCategoryListPage} from "./BaseCategoryListPage";

/**
 * Страница управления недавно удаленными категориями.
 *
 * @returns страница управления недавно удаленными категориями
 */
export const RecentlyDeletedCategoryListPage = () => {

    return (
        <BaseCategoryListPage recentlyDeleted={true}/>
    );
}
