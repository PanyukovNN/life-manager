import '../../App.css';
import {React} from 'react';
import {Button} from "react-bootstrap";

/**
 * Карточка категории
 *
 * @param category объект категории
 * @returns {*} компонент категории
 * @constructor
 */
export const Category = ({category}) => {

    return (
        <div className="category-block">
            <input className="task-id" type={"hidden"} value={category.id}/>

            <div className="category-name">
                {category.name}
            </div>

            <Button className="category-edit-button"
                    variant="primary"
                    onClick={() => {}}>
                Ред.
            </Button>

            <Button className="category-to-archive-button"
                    variant="primary"
                    onClick={() => {}}>
                В архив
            </Button>
        </div>
    )
}
