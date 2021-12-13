import '../../App.css';
import {React} from 'react';
import {Button} from "react-bootstrap";

/**
 * Карточка категории
 *
 * @param category объект категории
 * @param notifyEditBtnClick функция уведомления о клике на кнопке редактирования
 * @param notifyMoveToArchiveClick функция уведомления о клике на кнопке "в архив"
 * @returns {*} компонент категории
 * @constructor
 */
export const Category = ({category, notifyEditBtnClick, notifyMoveToArchiveClick}) => {

    return (
        <div className="category-block">
            <input className="task-id" type={"hidden"} value={category.id}/>

            <div className="category-name">
                {category.name}
            </div>

            <Button className="category-edit-button"
                    variant="primary"
                    onClick={() => {notifyEditBtnClick(category)}}>
                Ред.
            </Button>

            <Button className="category-to-archive-button"
                    variant="primary"
                    onClick={() => {notifyMoveToArchiveClick(category)}}>
                В архив
            </Button>
        </div>
    )
}
