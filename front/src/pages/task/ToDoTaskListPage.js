import '../../App.css';
import {React} from 'react'
import {BaseTaskListPage} from "./BaseTaskListPage";

/**
 * Страница со списком задач в статусе "к выполнению"
 *
 * @returns {*} главная страница со списком задач
 * @constructor
 */
export const ToDoTaskListPage = () => {

    return (
        <BaseTaskListPage
            taskStatus={"TO_DO"}
        />
    );
}
