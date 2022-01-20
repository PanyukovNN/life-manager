import '../../App.css';
import {React, useEffect, useState} from 'react'
import {CategoryListComponent} from "../../components/categorilist/CategoryListComponent";
import {Button} from "react-bootstrap";
import {CategoryModal} from "../../components/categorilist/CategoryModal";
import {moveToRecentlyDeleted, recoverFromRecentlyDeleted, removeCategory} from "../../services/CategoryService";

/**
 * Базовая страница управления категориями.
 *
 * @param recentlyDeleted флаг 'недавно удаленные'
 * @returns страница управления разделами
 */
export const BaseCategoryListPage = ({recentlyDeleted}) => {
    const [refreshCategoryListCall, setRefreshCategoryListCall] = useState(0);
    const [categoryToRecentlyDeleted, setCategoryToRecentlyDeleted] = useState(null);
    const [categoryToRecoverFromRecentlyDeleted, setCategoryToRecoverFromRecentlyDeleted] = useState(null);
    const [categoryToRemove, setCategoryToRemove] = useState(null);
    const [showModalCall, setShowModalCall] = useState(0);
    const [modalCategory, setModalCategory] = useState(null);

    useEffect(() => {
            if (categoryToRecentlyDeleted == null) {
                return;
            }

            moveToRecentlyDeleted(categoryToRecentlyDeleted.id)
                .then(() => {
                    setRefreshCategoryListCall(call => call + 1);
                })
        },
        [categoryToRecentlyDeleted]
    );

    useEffect(() => {
            if (categoryToRecoverFromRecentlyDeleted == null) {
                return;
            }

            recoverFromRecentlyDeleted(categoryToRecoverFromRecentlyDeleted.id)
                .then(() => {
                    setRefreshCategoryListCall(call => call + 1);
                })
        },
        [categoryToRecoverFromRecentlyDeleted]
    );

    useEffect(() => {
            if (categoryToRemove == null) {
                return;
            }

            removeCategory(categoryToRemove)
                .then(() => {
                    setRefreshCategoryListCall(call => call + 1);
                });
        },
        [categoryToRemove]
    );

    const renderAddCategoryBtn = (
            <Button className="add-category-button w-100"
                    variant="outline-secondary"
                    onClick={() => {
                        setShowModalCall(call => call + 1);
                        setModalCategory(null);
                    }}>
                Добавить
            </Button>
        );

    return (
        <div className="CategoryListPage">
            <div className="category-list-block">
                <div className="category-list-header-wrapper">
                    <div className="category-list-header">
                        {recentlyDeleted ? "Недавно удаленные разделы" : "Разделы"}

                        <Button className="category-recently-deleted-page-button"
                                href={recentlyDeleted ? "/categories" : "/categories/recently-deleted"}
                                variant="primary">
                            {recentlyDeleted ? "Разделы" : "Недавно удаленные"}
                        </Button>
                    </div>
                </div>

                <CategoryListComponent
                    refreshCategoryListCall={refreshCategoryListCall}
                    editCategory={(category) => {
                        setShowModalCall(call => call + 1);
                        setModalCategory(category);
                    }}
                    moveCategoryToRecentlyDeleted={setCategoryToRecentlyDeleted}
                    recoverCategoryFromRecentlyDeleted={setCategoryToRecoverFromRecentlyDeleted}
                    removeCategory={setCategoryToRemove}
                    recentlyDeleted={recentlyDeleted}/>

                {!recentlyDeleted && renderAddCategoryBtn}
            </div>

            <CategoryModal refreshCategoryList={() => setRefreshCategoryListCall(call => call + 1)}
                           showModalCall={showModalCall}
                           category={modalCategory} />
        </div>
    );
}
