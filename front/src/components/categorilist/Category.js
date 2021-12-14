import '../../App.css';
import {React} from 'react';
import {Button} from "react-bootstrap";

/**
 * Карточка категории
 *
 * @param category объект категории
 * @param notifyEditBtnClick функция уведомления о клике на кнопке редактирования
 * @param notifyMoveToArchiveClick функция уведомления о клике на кнопке "в архив"
 * @param notifyRemoveClick функция уведомления о клике на кнопке "удалить"
 * @param inArchive флаг в/вне архива
 * @returns {*} компонент категории
 * @constructor
 */
export const Category = ({category, notifyEditBtnClick, notifyMoveToArchiveClick, notifyRemoveClick, inArchive}) => {

    const toArchiveButton = (
        <Button className="category-to-archive-button"
                variant="primary"
                onClick={() => {notifyMoveToArchiveClick(category)}}>
            В архив
        </Button>
    );

    const removeButton = (
        <Button className="category-remove-button"
                variant="primary"
                onClick={() => {notifyRemoveClick(category)}}>
            Удалить
        </Button>
    );

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

            {inArchive.inArchive
                ? removeButton
                : toArchiveButton}
        </div>
    )
}
