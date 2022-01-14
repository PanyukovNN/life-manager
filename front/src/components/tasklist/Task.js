import '../../App.css';
import {React} from 'react';
import {Button} from "react-bootstrap";
import {DONE_TASK_STATUS} from "../../Constants";
import editIcon from '../../resources/icon/edit-icon.svg.png'
import ellipsisIcon from '../../resources/icon/ellipsis-icon.png'
import {useAlert} from "react-alert";
import {deleteReq, postReq} from "../../services/RequestService";

/**
 * Карточка задачи
 *
 * @param task объект задачи
 * @param refreshTaskList функция обновления списка задач
 * @param notifyTaskClick функция уведомления о клике на кнопке редактирования
 * @returns {*} компонент задачи
 */
export const Task = ({task, refreshTaskList, notifyEditBtnClick}) => {

    const doneStatusStyle = task.status === DONE_TASK_STATUS ? " task-done " : "";
    const overdueStyle = task.overdue ? " task-overdue " : "";
    const dropdownContentId = "dropdownContent" + task.id;

    const alert = useAlert();

    async function markAsDone() {
        let body = {
            ids: [task.id],
            status: DONE_TASK_STATUS
        };


        await postReq("http://localhost:80/api/task/set-status", body, alert)
            .then(response => {
                if (response && response.data) {
                    alert.show(response.data)
                }
            });

        refreshTaskList();
    }

    async function deleteTask() {
        let result = window.confirm("Вы уверены, что хотите удалить задачу?");
        if (!result) {
            return;
        }

        let body = {
            ids: [task.id]
        };

        await deleteReq("http://localhost:80/api/task/delete-by-ids", body, alert)
            .then(response => {
                if (response && response.data) {
                    alert.show(response.data)
                }
            });

        refreshTaskList();
    }

    return (
        <div className={"task-block" + doneStatusStyle}>
            <input className="task-id" type={"hidden"} value={task.id}/>

            <div className="task-description-buttons-wrap">
                <div className="task-description">{task.description}</div>

                <div className="task-buttons">
                    {/* Кнопка задачи с выпадающим списком,
                        все элементы должны быть помечены классом dropdown-element,
                        чтобы корректно отрабатывала функция закрытия всех dropdown-show элементов
                     */}
                    <div className="dropdown">
                        <Button className="task-ellipsis-button dropdown-element"
                                variant="primary"
                                onClick={() => {
                                    document.getElementById(dropdownContentId).classList.toggle('dropdown-show');
                                }}>
                            <img className="task-ellipsis-icon dropdown-element" src={ellipsisIcon}/>
                        </Button>

                        <div className="dropdown-content dropdown-element" id={dropdownContentId}>
                            <a onClick={markAsDone}>Выполнена</a>
                            <a onClick={deleteTask}>Удалить</a>
                        </div>
                    </div>

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
