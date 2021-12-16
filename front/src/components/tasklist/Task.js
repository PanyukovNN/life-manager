import '../../App.css';
import {React} from 'react';
import {Button, Form} from "react-bootstrap";

/**
 * Карточка задачи
 *
 * @param task объект задачи
 * @param handleCheck обработка выбора задачи
 * @param notifyTaskClick функция уведомления о клике на кнопке редактирования
 * @returns {*} компонент задачи
 */
export const Task = ({task, handleCheck, notifyEditBtnClick}) => {

    return (
        <div className="task-block">
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

                <div className="task-planned-time">
                    {task.plannedTime}
                </div>

                <div className="task-planned-date">
                    {task.plannedDate}
                </div>

                <Button className="task-edit-button"
                        variant="primary"
                        onClick={() => {notifyEditBtnClick(task)}}>
                    Edit
                </Button>
            </div>

            <div className="task-description">
                {task.description}
            </div>
        </div>
    )
}
