import '../../App.css';
import {React} from 'react'
import {BaseTaskListPage} from "./BaseTaskListPage";

/**
 * Страница со списком задач в статусе "выполнена"
 *
 * @returns {*} главная страница со списком задач
 * @constructor
 */
export const DoneTaskListPage = () => {

    return (
        <BaseTaskListPage
            taskStatus={"DONE"}
        />
    );
}
