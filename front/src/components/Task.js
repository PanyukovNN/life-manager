import '../App.css';
import {React} from 'react';
import {Form} from "react-bootstrap";

/**
 * Карточка задачи
 *
 * @param task объект задачи
 * @param handleCheck обработка выбора задачи
 * @param notifyTaskClick функция уведомления о клике на карточке задачи
 * @returns {*} компонент задачи
 */
export const Task = ({task, handleCheck, notifyTaskClick}) => {

    return (
        <div className="task-block" onClick={() => {notifyTaskClick(task)}}>
            <input className="task-id" type={"hidden"} value={task.id}/>

            <div className="task-info">
                <div className="task-check">
                    <Form.Check
                        inline
                        type="checkbox"
                        onChange={() => handleCheck(task.id)}/>
                </div>

                <div className="task-priority">
                    {task.priority}
                </div>

                <div className="task-category">
                    {task.category}
                </div>

                <div className="task-completion-time">
                    {task.completionTime}
                </div>

                <div className="task-completion-date">
                    {task.completionDate}
                </div>
            </div>

            <div className="task-description">
                {task.description}
            </div>
        </div>
    )
}
