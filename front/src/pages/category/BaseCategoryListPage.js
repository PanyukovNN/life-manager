import '../../App.css';
import {React, useEffect, useState} from 'react'
import {CategoryListComponent} from "../../components/categorilist/CategoryListComponent";
import {Button} from "react-bootstrap";
import {CategoryModal} from "../../components/categorilist/CategoryModal";
import {moveToFromArchive} from "../../services/CategoryService";

/**
 * Базовая страница управления разделами
 *
 * @returns страница управления разделами
 * @constructor
 */
export const BaseCategoryListPage = ({inArchive}) => {
    const [refreshCategoryListCall, setRefreshCategoryListCall] = useState(0);
    const [categoryToFromArchive, setCategoryToFromArchive] = useState(null);
    const [removeCategory, setRemoveCategory] = useState(null);
    const [showModalCall, setShowModalCall] = useState(0);
    const [modalCategory, setModalCategory] = useState(null);

    useEffect(() => {
            if (categoryToFromArchive == null) {
                return;
            }

            moveToFromArchive(categoryToFromArchive.name, !inArchive)
                .then(() => {
                    setRefreshCategoryListCall(refreshCategoryListCall => refreshCategoryListCall + 1);
                })
        },
        [categoryToFromArchive]
    );

    useEffect(() => {
            if (removeCategory == null) {
                return;
            }

            setRefreshCategoryListCall(refreshCategoryListCall => refreshCategoryListCall + 1);
        },
        [removeCategory]
    );

    const addCategoryBtn = (
        <Button className="add-category-button"
                variant="primary"
                onClick={() => {
                    setShowModalCall(showModalCall => showModalCall + 1);
                    setModalCategory(null);
                }}>
            Добавить
        </Button>
    );

    return (
        <div className="CategoryListPage">
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

            <div className="category-list-block">
                <CategoryListComponent
                    refreshCategoryListCall={refreshCategoryListCall}
                    notifyUpdateCategoryClick={(category) => {
                        setShowModalCall(showModalCall => showModalCall + 1);
                        setModalCategory(category);
                    }}
                    notifyToArchiveCategoryClick={setCategoryToFromArchive}
                    notifyRemoveCategoryClick={setRemoveCategory}
                    inArchive={inArchive}/>
            </div>

            {!inArchive ? addCategoryBtn : ""}

            <CategoryModal refreshCategoryList={() => setRefreshCategoryListCall(refreshCategoryListCall => refreshCategoryListCall + 1)}
                           showModalCall={showModalCall}
                           category={modalCategory} />
        </div>
    );
}
