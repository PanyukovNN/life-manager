import '../../App.css';
import {React} from 'react';
import {Button, Form} from "react-bootstrap";
import {DONE_TASK_STATUS} from "../../Constants";
import editIcon from '../../resources/icon/edit-icon.svg.png'

/**
 * Карточка задачи
 *
 * @param task объект задачи
 * @param handleCheck обработка выбора задачи
 * @param notifyTaskClick функция уведомления о клике на кнопке редактирования
 * @returns {*} компонент задачи
 */
export const Task = ({task, handleCheck, notifyEditBtnClick}) => {

    let doneStatusStyle = task.status === DONE_TASK_STATUS ? " task-done " : "";
    let overdueStyle = task.overdue ? " task-overdue " : "";

    return (
        <div className={"task-block" + doneStatusStyle}>
            <input className="task-id" type={"hidden"} value={task.id}/>

            <div className="task-description-buttons-wrap">
                <div className="task-description">{task.description}</div>

                <div className="task-info">
                    <Button className="task-edit-button"
                            variant="primary"
                            onClick={() => {notifyEditBtnClick(task)}}>
                        <img className="task-edit-icon" src={editIcon}/>
                    </Button>
                </div>
            </div>

            <div className="task-footer-wrap">
                <div className={"task-planned-date-time-wrap" + overdueStyle}>
                    {task.plannedTime
                        ? <div className="task-planned-time">{task.plannedTime}</div>
                        : ""}

                    <div className="task-planned-date">{task.plannedDate}</div>
                </div>
            </div>
        </div>
    )
}
