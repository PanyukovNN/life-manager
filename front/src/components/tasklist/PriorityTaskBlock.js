import '../../App.css';
import {React} from 'react';
import {Button} from "react-bootstrap";
import {PRIORITY_2_DEFINITION_PLURAL} from '../../Constants'

/**
 * Блок со списком задач с соответствующим приоритетом
 *
 * @param priorityLetter буква приоритета
 * @param taskComponents список задач
 * @param showModal функция показа модального окна
 * @returns {*} компонент задачи
 */
export const PriorityTaskBlock = ({priorityLetter,
                                      taskComponents,
                                      showModal}) => {

    return (
        <div className="priority-task-block">
            <div className="priority-task-block-header">
                {PRIORITY_2_DEFINITION_PLURAL[priorityLetter]}
            </div>

            {taskComponents}

            <Button className="add-task-button w-100"
                    variant="outline-secondary"
                    onClick={() => showModal(priorityLetter)}>
                Добавить
            </Button>
        </div>
    )
}
