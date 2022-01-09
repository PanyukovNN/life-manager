import '../../App.css';
import {React, useEffect, useState} from 'react'
import {CategoryListComponent} from "../../components/categorilist/CategoryListComponent";
import {Button} from "react-bootstrap";
import {CategoryModal} from "../../components/categorilist/CategoryModal";
import {useAlert} from "react-alert";
import {postReq, deleteReq} from "../../services/RequestService"

/**
 * Базовая страница управления разделами
 *
 * @param spinnerCall хук показа спиннера загрузки
 * @returns {*} страница управления разделами
 * @constructor
 */
export const BaseCategoryListPage = ({inArchive, showSpinner}) => {

    const alert = useAlert();
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
                    inArchive: !inArchive
                };

                await postReq("http://localhost:80/api/category/set-in-archive", body, alert)
                    .then(response => {
                        if (response && response.data) {
                            alert.show(response.data)
                        }
                    });

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

            let result = window.confirm("Вы уверены, что хотите удалить категорию \"" + removeCategory.name + "\"?");

            if (!result) {
                return;
            }

            const remove = async () => {
                let body = {
                    name: removeCategory.name
                };

                await deleteReq("http://localhost:80/api/category/delete-by-name", body, alert)
                    .then(response => {
                        if (response && response.data) {
                            alert.show(response.data)
                        }
                    });

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
                    notifyToArchiveCategoryClick={setMoveToArchiveCategory}
                    notifyRemoveCategoryClick={setRemoveCategory}
                    inArchive={inArchive}
                    showSpinner={showSpinner}/>
            </div>

            {!inArchive ? addCategoryBtn : ""}

            <CategoryModal refreshCategoryList={() => setRefreshCategoryListCall(refreshCategoryListCall => refreshCategoryListCall + 1)}
                           showModalCall={showModalCall}
                           category={modalCategory} />
        </div>
    );
}
