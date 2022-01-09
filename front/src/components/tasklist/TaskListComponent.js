import '../../App.css';
import {Task} from "./Task";
import {React, useEffect, useState} from 'react';
import {
    CATEGORY_SELECT_ID,
    COMPARE_TO_SELECT_ID,
    PERIOD_SELECT_ID,
    PRIORITY_LETTER_SELECT_ID,
    STATUS_SELECT_ID
} from '../../Constants'
import {useAlert} from "react-alert";
import {postReq} from "../../services/RequestService";

/**
 * Загружает и формирует список задач
 *
 * @param refreshTaskListCall хук обновления списка задач
 * @param handleCheck обработка выбора задачи
 * @param notifyUpdateTaskClick функция клика на кнопке редактирования задачи
 * @param spinnerCall хук показа спиннера загрузки
 * @returns {*} список задач
 * @constructor
 */
export const TaskListComponent = ({refreshTaskListCall, handleCheck, notifyUpdateTaskClick, showSpinner}) => {
    const alert = useAlert();
    const [taskComponents, setTasks] = useState();

    useEffect(
        () => {
            if (refreshTaskListCall === 0) {
                return;
            }

            showSpinner(true);

            const priorityLetter = document.getElementById(PRIORITY_LETTER_SELECT_ID).selectedOptions[0].value;
            const category = document.getElementById(CATEGORY_SELECT_ID).selectedOptions[0].value;
            const periodType = document.getElementById(PERIOD_SELECT_ID).selectedOptions[0].value;
            const compareType = document.getElementById(COMPARE_TO_SELECT_ID).selectedOptions[0].value;
            const status = document.getElementById(STATUS_SELECT_ID).selectedOptions[0].value;

            const fetchTasks = async () => {
                let body = {
                    priorityLetter: priorityLetter,
                    taskStatuses: status !== "" ? [status] : [],
                    categories: category !== "" ? [category] : [],
                    periodType: periodType !== "" ? periodType : "ALL",
                    compareType: compareType !== "" ? compareType : "PRIORITY_FIRST"
                };

                let tasks = await postReq("http://localhost:80/api/task/find-list", body, alert)
                    .then(response => {
                        if (response && response.data) {
                            return response.data;
                        }

                        return null;
                    });

                setTasks(() => {
                    let taskComponents = [];

                    if (!tasks || tasks.length === 0) {
                        return (
                            <div className="empty-list-label">Нет элементов</div>
                        );
                    }

                    tasks.forEach(task => taskComponents.push(
                        <Task task={task}
                              handleCheck={handleCheck}
                              notifyEditBtnClick={(task) => notifyUpdateTaskClick(task)}
                              key={task.id}/>
                    ));

                    return taskComponents;
                });

                showSpinner(false);
            }

            fetchTasks();
        },
        [refreshTaskListCall]
    );

    return (
        <>
            <div className="task-components-wrap">
                {taskComponents}
            </div>
        </>
    )
}
