import '../../App.css';
import {React} from 'react'
import {BaseTaskListPage} from "./BaseTaskListPage";
import {DONE_TASK_STATUS} from "../../Constants";

/**
 * Страница со списком задач в статусе "выполнена"
 *
 * @returns главная страница со списком задач
 */
export const DoneTaskListPage = () => {

    return (
        <BaseTaskListPage taskStatus={DONE_TASK_STATUS}/>
    );
}
