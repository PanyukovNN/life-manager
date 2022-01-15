import '../../App.css';
import {React, useEffect, useState} from 'react'
import {CategoryListComponent} from "../../components/categorilist/CategoryListComponent";
import {Button} from "react-bootstrap";
import {CategoryModal} from "../../components/categorilist/CategoryModal";
import {moveToFromArchive, removeCategory} from "../../services/CategoryService";
import {isLoading} from "../../services/Util";

/**
 * Базовая страница управления разделами
 *
 * @param inArchive флаг в/вне архива
 * @returns страница управления разделами
 */
export const BaseCategoryListPage = ({inArchive}) => {
    const [refreshCategoryListCall, setRefreshCategoryListCall] = useState(0);
    const [categoryToFromArchive, setCategoryToFromArchive] = useState(null);
    const [categoryToRemove, setCategoryToRemove] = useState(null);
    const [showModalCall, setShowModalCall] = useState(0);
    const [modalCategory, setModalCategory] = useState(null);

    useEffect(() => {
            if (categoryToFromArchive == null) {
                return;
            }

            moveToFromArchive(categoryToFromArchive.name, !inArchive)
                .then(() => {
                    setRefreshCategoryListCall(call => call + 1);
                })
        },
        [categoryToFromArchive]
    );

    useEffect(() => {
            if (categoryToRemove == null) {
                return;
            }

            removeCategory(categoryToRemove.name)
                .then(() => {
                    setRefreshCategoryListCall(call => call + 1);
                });
        },
        [categoryToRemove]
    );

    const renderAddCategoryBtn = (
        <Button className="add-category-button w-100"
                variant="outline-secondary"
                disabled={isLoading}
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
                        {inArchive ? "Архив разделов" : "Разделы"}

                        <Button className="category-archive-page-button"
                                href={inArchive ? "/categories" : "/categories/archive"}
                                variant="primary">
                            {inArchive ? "Разделы" : "Архив"}
                        </Button>
                    </div>
                </div>

                <CategoryListComponent
                    refreshCategoryListCall={refreshCategoryListCall}
                    notifyUpdateCategoryClick={(category) => {
                        setShowModalCall(call => call + 1);
                        setModalCategory(category);
                    }}
                    notifyToArchiveCategoryClick={setCategoryToFromArchive}
                    notifyRemoveCategoryClick={setCategoryToRemove}
                    inArchive={inArchive}/>

                {!inArchive && renderAddCategoryBtn}
            </div>

            <CategoryModal refreshCategoryList={() => setRefreshCategoryListCall(call => call + 1)}
                           showModalCall={showModalCall}
                           category={modalCategory} />
        </div>
    );
}
