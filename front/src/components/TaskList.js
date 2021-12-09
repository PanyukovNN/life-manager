import '../App.css';
import {Task} from "./Task";
import {React, useEffect, useState} from 'react';
import {
    CATEGORY_SELECT_ID,
    PRIORITY_LETTER_SELECT_ID,
    PERIOD_SELECT_ID,
    COMPARE_TO_SELECT_ID,
    TO_DO_TASK_STATUS
} from '../Constants'

/**
 * Загружает и формирует список задач
 *
 * @param refreshTaskListCall хук обновления списка задач
 * @param handleCheck обработка выбора задачи
 * @returns {*} список задач
 * @constructor
 */
export const TaskList = ({refreshTaskListCall, handleCheck}) => {
    const [taskComponents, setTasks] = useState();

    useEffect(
        (refreshTaskListCall) => {
            const priorityLetter = document.getElementById(PRIORITY_LETTER_SELECT_ID).selectedOptions[0].value;
            const category = document.getElementById(CATEGORY_SELECT_ID).selectedOptions[0].value;
            const periodType = document.getElementById(PERIOD_SELECT_ID).selectedOptions[0].value;
            const compareType = document.getElementById(COMPARE_TO_SELECT_ID).selectedOptions[0].value;

            const fetchTasks = async () => {
                let body = {
                    priority: priorityLetter,
                    taskStatuses: [TO_DO_TASK_STATUS],
                    categories: category !== "" ? [category] : [],
                    periodType: periodType !== "" ? periodType : "ALL",
                    compareType: compareType !== "" ? compareType : "PRIORITY_FIRST"
                };

                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                };

                const response = await fetch("http://localhost:80/api/task/find-list", requestOptions)
                const data = await response.json();

                setTasks(() => {
                    let taskComponents = [];
                    data.forEach(task => taskComponents.push(
                        <Task task={task} handleCheck={handleCheck} key={task.id} />
                    ));

                    return taskComponents;
                });
            }

            fetchTasks();
        },
        [refreshTaskListCall]
    );

    return (
        <div className="task-components-wrap">
            {taskComponents}
        </div>
    )
}
