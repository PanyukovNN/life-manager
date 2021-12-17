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

                const requestOptions = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(body)
                };

                const response = await fetch("http://localhost:80/api/task/find-list", requestOptions)
                const data = await response.json();

                setTasks(() => {
                    let taskComponents = [];
                    data.forEach(task => taskComponents.push(
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
