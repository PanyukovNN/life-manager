import '../App.css';
import {React} from 'react';
import {Button} from "react-bootstrap";

export const DoneRemoveButtons = () => {
    return (
        <>
            <Button className="task-done-button" variant="primary">
                <span>Готово</span>
            </Button>

            <Button className="task-remove-button" variant="primary" onCli>
                <span>Удалить</span>
            </Button>
        </>
    )
}
