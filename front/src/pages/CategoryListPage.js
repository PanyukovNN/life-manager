import '../App.css';
import {React, useEffect, useState} from 'react'
import {CategoryListComponent} from "../components/categorilist/CategoryListComponent";
import {Button} from "react-bootstrap";
import {CategoryModal} from "../components/categorilist/CategoryModal";

/**
 * Страница управления разделами
 *
 * @returns {*} страница управления разделами
 * @constructor
 */
export const CategoryListPage = () => {

    const [refreshCategoryListCall, setRefreshCategoryListCall] = useState(0);
    const [moveToArchiveCategory, setMoveToArchiveCategory] = useState(null);
    const [showModalCall, setShowModalCall] = useState(0);
    const [modalCategory, setModalCategory] = useState(null);

    useEffect(() => {
            if (moveToArchiveCategory == null) {
                return;
            }

            const moveToArchive = async () => {
                let body = {
                    name: moveToArchiveCategory.name,
                    inArchive: true
                };

                const requestOptions = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(body)
                };

                const response = await fetch('http://localhost:80/api/category/set-in-archive', requestOptions);
                await response;

                setRefreshCategoryListCall(refreshCategoryListCall => refreshCategoryListCall + 1);
            }
            moveToArchive();
        },
        [moveToArchiveCategory]
    );

    return (
        <div className="CategoryListPage">
            <div className="category-list-header-wrapper">
                <div className="category-list-header">Разделы</div>
            </div>

            <div className="category-list-block">
                <CategoryListComponent
                    refreshCategoryListCall={refreshCategoryListCall}
                    notifyUpdateCategoryClick={(category) => {
                        setShowModalCall(showModalCall => showModalCall + 1);
                        setModalCategory(category);
                    }}
                    notifyToArchiveCategoryClick={(category) => {
                        setMoveToArchiveCategory(category);
                    }}/>
            </div>

            <Button className="add-category-button"
                    variant="primary"
                    onClick={() => {
                        setShowModalCall(showModalCall => showModalCall + 1);
                        setModalCategory(null);
                    }}>
                <span className="plus-sign">&#43;</span>
            </Button>

            <CategoryModal refreshCategoryList={() => setRefreshCategoryListCall(refreshCategoryListCall => refreshCategoryListCall + 1)}
                           showModalCall={showModalCall}
                           category={modalCategory} />
        </div>
    );
}
