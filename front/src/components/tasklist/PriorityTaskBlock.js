import '../../App.css';
import {React} from 'react';

/**
 * Блок со списком задач с соответствующим приоритетом
 *
 * @param priorityLetter буква приоритета
 * @param taskComponents список задач
 * @returns {*} компонент задачи
 */
export const PriorityTaskBlock = ({priorityLetter, taskComponents}) => {

    return (
        <div className={"priority-task-block"}>
            <div>
                {priorityLetter}
            </div>

            {taskComponents}
        </div>
    )
}
