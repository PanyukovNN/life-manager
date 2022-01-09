import '../../App.css';
import {React} from 'react'
import {BaseTaskListPage} from "./BaseTaskListPage";

/**
 * Страница со списком задач в статусе "выполнена"
 *
 * @param spinnerCall хук показа спиннера загрузки
 * @returns {*} главная страница со списком задач
 * @constructor
 */
export const DoneTaskListPage = ({showSpinner}) => {

    return (
        <BaseTaskListPage
            showSpinner={showSpinner}
            taskStatus={"DONE"}
        />
    );
}
