import '../../App.css';
import {React} from 'react';
import {Button} from "react-bootstrap";
import {DONE_TASK_STATUS} from "../../Constants";
import removeIcon from "../../resources/icon/remove.svg.png";
import readyIcon from "../../resources/icon/ready.svg";
import {useAlert} from "react-alert";
import {deleteReq, postReq} from "../../services/RequestService";

/**
 * Кнопки "изменить статус на 'выполнено'" и "удалить"
 *
 * @param refreshTaskList хук обновления списка задач
 * @param checkedTaskIds список идентификаторов выбранных задач
 * @param disabled флаг отключения кнопок
 * @returns {*} кнопки
 * @constructor
 */
export const DoneRemoveTaskButtons = ({refreshTaskList, checkedTaskIds, disabled}) => {

    const alert = useAlert();

    async function markAsDone() {
        if (!checkedTaskIds.length) {
            alert.show("Не выбрана ни одна задача");
        }

        let body = {
            ids: checkedTaskIds,
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

    async function deleteTasks() {
        let result = window.confirm("Вы уверены, что хотите удалить выбранные задачи?");
        if (!result) {
            return;
        }

        if (!checkedTaskIds.length) {
            alert.show("Не выбрана ни одна задача");
        }

        let body = {
            ids: checkedTaskIds
        };

        await deleteReq("http://localhost:80/api/task/delete-by-ids", body, alert)
            .then(response => alert.show(response.data));

        refreshTaskList();
    }

    return (
        <>
            <Button className="task-done-button"
                    variant="primary"
                    onClick={markAsDone}
                    disabled={disabled || !checkedTaskIds.length}>
                <img className="task-ready-icon" src={readyIcon}/>
            </Button>

            <Button className="task-remove-button"
                    variant="primary"
                    onClick={deleteTasks}
                    disabled={disabled || !checkedTaskIds.length}>
                <img className="task-remove-icon" src={removeIcon}/>
            </Button>
        </>
    )
}
