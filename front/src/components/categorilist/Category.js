import '../../App.css';
import {React} from 'react';
import {Button} from "react-bootstrap";
import editIcon from "../../resources/icon/edit-icon.svg.png";
import removeIcon from "../../resources/icon/remove.svg.png";
import recoverIcon from "../../resources/icon/recover-icon.png";

/**
 * Карточка категории
 *
 * @param category объект категории
 * @param editCategory функция уведомления о клике на кнопке редактирования
 * @param moveCategoryToRecentlyDeleted функция уведомления о клике на кнопке "поместить в недавно удаленные"
 * @param recoverCategoryFromRecentlyDeleted функция уведомления о клике на кнопке "восстановить из недавно удаленных"
 * @param removeCategory функция уведомления о клике на кнопке "удалить"
 * @param recentlyDeleted флаг 'недавно удаленная'
 * @returns компонент категории
 */
export const Category = ({category,
                             editCategory,
                             moveCategoryToRecentlyDeleted,
                             recoverCategoryFromRecentlyDeleted,
                             removeCategory,
                             recentlyDeleted}) => {

    const renderEditButton = (
        <Button className="category-edit-button"
                variant="primary"
                onClick={() => editCategory(category)}>
            <img className="category-edit-icon" src={editIcon} alt="Edit"/>
        </Button>
    );

    const renderMoveToRecentlyDeletedBtn = (
        <Button className="category-move-to-recently-deleted-button"
                variant="primary"
                onClick={() => {moveCategoryToRecentlyDeleted(category)}}>
            <img className="category-remove-icon" src={removeIcon} alt="Move to recently deleted"/>
        </Button>
    );

    const renderRecoverFromRecentlyDeletedBtn = (
        <Button className="category-recover-from-recently-deleted-button"
                variant="primary"
                onClick={() => {recoverCategoryFromRecentlyDeleted(category)}}>
            <img className="category-recover-from-recently-deleted-icon" src={recoverIcon} alt="Recover from recently deleted"/>
        </Button>
    );

    const renderRemoveButton = (
        <Button className="category-remove-button"
                variant="primary"
                onClick={() => {removeCategory(category)}}>
            <img className="category-remove-icon" src={removeIcon} alt="Remove"/>
        </Button>
    );

    return (
        <div className="category-block">
            <input className="category-id" type={"hidden"} value={category.id}/>

            <div className="category-name">
                {category.name}
            </div>

            {!recentlyDeleted && renderEditButton}
            {!recentlyDeleted && renderMoveToRecentlyDeletedBtn}

            {recentlyDeleted && renderRecoverFromRecentlyDeletedBtn}
            {recentlyDeleted && renderRemoveButton}
        </div>
    )
}
