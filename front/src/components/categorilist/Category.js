import '../../App.css';
import {React} from 'react';
import {Button} from "react-bootstrap";
import editIcon from "../../resources/icon/edit-icon.svg.png";
import removeIcon from "../../resources/icon/remove.svg.png";
import archiveIcon from "../../resources/icon/archive.png";

/**
 * Карточка категории
 *
 * @param category объект категории
 * @param notifyEditBtnClick функция уведомления о клике на кнопке редактирования
 * @param notifyMoveToArchiveClick функция уведомления о клике на кнопке "в архив"
 * @param notifyRemoveClick функция уведомления о клике на кнопке "удалить"
 * @param inArchive флаг в/вне архива
 * @returns компонент категории
 */
export const Category = ({category,
                             notifyEditBtnClick,
                             notifyMoveToArchiveClick,
                             notifyRemoveClick,
                             inArchive}) => {

    const renderEditButton = (
        <Button className="category-edit-button"
                variant="primary"
                onClick={() => notifyEditBtnClick(category)}>
            <img className="category-edit-icon" src={editIcon} alt="Edit"/>
        </Button>
    );

    const renderToArchiveButton = (
        <Button className="category-to-archive-button"
                variant="primary"
                onClick={() => {notifyMoveToArchiveClick(category)}}>
            <img className="category-to-archive-icon" src={archiveIcon} alt="To archive"/>
        </Button>
    );

    const renderRemoveButton = (
        <Button className="category-remove-button"
                variant="primary"
                onClick={() => {notifyRemoveClick(category)}}>
            <img className="category-remove-icon" src={removeIcon} alt="Remove"/>
        </Button>
    );

    return (
        <div className="category-block">
            <input className="category-id" type={"hidden"} value={category.id}/>

            <div className="category-name">
                {category.name}
            </div>

            {renderEditButton}

            {inArchive
                ? renderRemoveButton
                : renderToArchiveButton}
        </div>
    )
}
