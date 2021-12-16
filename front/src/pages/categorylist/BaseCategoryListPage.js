import '../../App.css';
import {React, useEffect, useState} from 'react'
import {CategoryListComponent} from "../../components/categorilist/CategoryListComponent";
import {Button} from "react-bootstrap";
import {CategoryModal} from "../../components/categorilist/CategoryModal";
import {SendRequest} from "../../Utils";

/**
 * Базовая страница управления разделами
 *
 * @returns {*} страница управления разделами
 * @constructor
 */
export const BaseCategoryListPage = (inArchive) => {

    const [refreshCategoryListCall, setRefreshCategoryListCall] = useState(0);
    const [moveToArchiveCategory, setMoveToArchiveCategory] = useState(null);
    const [removeCategory, setRemoveCategory] = useState(null);
    const [showModalCall, setShowModalCall] = useState(0);
    const [modalCategory, setModalCategory] = useState(null);

    useEffect(() => {
            if (moveToArchiveCategory == null) {
                return;
            }

            const moveToArchive = async () => {
                let body = {
                    name: moveToArchiveCategory.name,
                    inArchive: !inArchive.inArchive
                };

                await SendRequest("POST", body, "http://localhost:80/api/category/set-in-archive");

                setRefreshCategoryListCall(refreshCategoryListCall => refreshCategoryListCall + 1);
            }
            moveToArchive();
        },
        [moveToArchiveCategory]
    );

    useEffect(() => {
            if (removeCategory == null) {
                return;
            }

            const remove = async () => {
                let body = {
                    name: removeCategory.name
                };

                await SendRequest("DELETE", body, "http://localhost:80/api/category/delete-by-name");

                setRefreshCategoryListCall(refreshCategoryListCall => refreshCategoryListCall + 1);
            }
            remove();
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
            <span className="plus-sign">&#43;</span>
        </Button>
    );

    return (
        <div className="CategoryListPage">
            <div className="category-list-header-wrapper">
                <div className="category-list-header">
                    {inArchive.inArchive ? "Архив разделов" : "Разделы"}

                    <Button className="category-archive-page-button"
                            href={inArchive.inArchive ? "/categories" : "/categories/archive"}
                            variant="primary"
                            onClick={() => {}}>
                        {inArchive.inArchive ? "Разделы" : "Архив"}
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
                    notifyToArchiveCategoryClick={setMoveToArchiveCategory}
                    notifyRemoveCategoryClick={setRemoveCategory}
                    inArchive={inArchive}/>
            </div>

            {!inArchive.inArchive ? addCategoryBtn : ""}

            <CategoryModal refreshCategoryList={() => setRefreshCategoryListCall(refreshCategoryListCall => refreshCategoryListCall + 1)}
                           showModalCall={showModalCall}
                           category={modalCategory} />
        </div>
    );
}