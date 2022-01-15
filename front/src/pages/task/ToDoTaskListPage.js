import '../../App.css';
import {React} from 'react'
import {BaseTaskListPage} from "./BaseTaskListPage";
import {TO_DO_TASK_STATUS} from "../../Constants";

/**
 * Страница со списком задач в статусе "к выполнению"
 *
 * @returns главная страница со списком задач
 */
export const ToDoTaskListPage = () => {

    return (
        <BaseTaskListPage taskStatus={TO_DO_TASK_STATUS}/>
    );
}
