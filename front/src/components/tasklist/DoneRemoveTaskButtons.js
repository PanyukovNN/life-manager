import '../../App.css';
import {React} from 'react';
import {Button} from "react-bootstrap";
import {DONE_TASK_STATUS} from "../../Constants";
import removeIcon from "../../resources/icon/remove.svg.png";
import readyIcon from "../../resources/icon/ready.svg";
import {useAlert} from "react-alert";
import getAccessToken from "../../services/AuthHeader";
import axios from "axios";

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
        let body = {
            ids: checkedTaskIds,
            status: DONE_TASK_STATUS
        };

        await axios.post("http://localhost:80/api/task/set-status",
            JSON.stringify(body),
            {
                headers : {'Authorization': getAccessToken(), 'Content-Type': 'application/json'}
            })
            .then((response) => {
                if (response.status !== 200) {
                    throw response;
                }

                alert.show(response.data)
            })
            .catch((error) => {
                alert.show(error.response.data.message)
            });

        refreshTaskList();
    }

    async function deleteTasks() {
        let result = window.confirm("Вы уверены, что хотите удалить выбранные задачи?");

        if (!result) {
            return;
        }

        let body = {
            ids: checkedTaskIds
        };

        await axios.delete("http://localhost:80/api/task/delete-by-ids",{
            data: JSON.stringify(body),
            headers : {'Authorization': getAccessToken(), 'Content-Type': 'application/json'}
        })
            .then((response) => {
                console.log(response)
                if (response.status !== 200) {
                    throw response;
                }

                alert.show(response.data)
            })
            .catch((error) => {
                alert.show(error.response.data.message)
            });

        refreshTaskList();
    }

    return (
        <>
            <Button className="task-done-button"
                    variant="primary"
                    onClick={markAsDone}
                    disabled={disabled}>
                <img className="task-ready-icon" src={readyIcon}/>
            </Button>

            <Button className="task-remove-button"
                    variant="primary"
                    onClick={deleteTasks}
                    disabled={disabled}>
                <img className="task-remove-icon" src={removeIcon}/>
            </Button>
        </>
    )
}
