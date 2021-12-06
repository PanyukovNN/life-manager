import '../App.css';
import {Task} from "./Task";
import {React, useEffect, useState} from 'react';
import {CATEGORY_SELECT_ID, PRIORITY_LETTER_SELECT_ID, PERIOD_SELECT_ID, COMPARE_TO_SELECT_ID} from '../Constants'

/**
 * Загружает и формирует список задач
 *
 * @returns {*} список задач
 * @constructor
 */
export const TaskList = (taskListUpdateCall) => {
    const [taskComponents, setTasks] = useState();

    useEffect(
        (taskListUpdateCall) => {
            const priorityLetter = document.getElementById(PRIORITY_LETTER_SELECT_ID).selectedOptions[0].value;
            const category = document.getElementById(CATEGORY_SELECT_ID).selectedOptions[0].value;
            const periodType = document.getElementById(PERIOD_SELECT_ID).selectedOptions[0].value;
            const compareType = document.getElementById(COMPARE_TO_SELECT_ID).selectedOptions[0].value;

            const fetchTasks = async () => {
                let body = JSON.stringify({
                    priority: priorityLetter,
                    taskStatuses: [],
                    categories: category !== "" ? [category] : [],
                    periodType: periodType !== "" ? periodType : "ALL",
                    compareType: compareType !== "" ? compareType : "PRIORITY_FIRST"
                });
                console.log(body)
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: body
                };

                // запрашиваем список задач
                const response = await fetch("http://localhost:80/api/task/find-list", requestOptions)
                const data = await response.json();

                // создаем функцию возврата компонентов задач
                setTasks(() => {
                    let taskComponents = [];
                    data.forEach(task => taskComponents.push(
                        <Task task={task} />
                    ));

                    return taskComponents;
                });
            }

            fetchTasks();
        },
        [taskListUpdateCall]
    );

    return (
        <div className="task-components-wrap">
            {taskComponents}
        </div>
    )
}
