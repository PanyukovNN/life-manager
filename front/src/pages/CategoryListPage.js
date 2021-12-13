import '../App.css';
import {React, useState} from 'react'
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
    const [showModalCall, setShowModalCall] = useState(0);
    const [modalCategory, setModalCategory] = useState(null);

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
