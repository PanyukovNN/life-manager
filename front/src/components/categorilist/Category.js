import '../../App.css';
import {React} from 'react';
import {Button} from "react-bootstrap";

export const Category = ({category}) => {

    return (
        <div className="category-block">
            <input className="task-id" type={"hidden"} value={category.id}/>

            <div className="task-description">
                {category.name}
            </div>

            <Button className="category-remove-button"
                    variant="primary"
                    onClick={() => {}}>
                Удалить
            </Button>
        </div>
    )
}
