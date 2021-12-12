import '../../App.css';
import {React} from 'react';
import {Button} from "react-bootstrap";
import {DONE_TASK_STATUS} from "../../Constants";

/**
 * Кнопки "изменить статус на 'выполнено'" и "удалить"
 * @param refreshTaskList хук обновления списка задач
 * @param checkedTaskIds список идентификаторов выбранных задач
 * @returns {*} кнопки
 * @constructor
 */
export const DoneRemoveButtons = ({refreshTaskList, checkedTaskIds}) => {

    async function markAsDone() {
        let body = {
            ids: checkedTaskIds,
            status: DONE_TASK_STATUS
        };

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        };

        const response = await fetch("http://localhost:80/api/task/set-status", requestOptions)
        await response;

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

        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        };

        const response = await fetch("http://localhost:80/api/task/delete-by-ids", requestOptions)
        await response;

        refreshTaskList();
    }

    return (
        <>
            <Button className="task-done-button" variant="primary" onClick={markAsDone}>
                <span>Готово</span>
            </Button>

            <Button className="task-remove-button" variant="primary" onClick={deleteTasks}>
                <span>Удалить</span>
            </Button>
        </>
    )
}
