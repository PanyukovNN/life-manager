import '../App.css';
import {Task} from "./Task";
import {React, useEffect, useState} from 'react';
import {CATEGORY_KEY, PRIORITY_KEY, PERIOD_KEY, SORT_ORDER_KEY} from '../Constants'

/**
 * Загружает и формирует список задач
 *
 * @returns {*} список задач
 * @constructor
 */
export const TaskList = (count) => {
    const [taskComponents, setTasks] = useState();

    useEffect(
        (count) => {
            const category = localStorage.getItem(CATEGORY_KEY).replace(/\"/g, "");
            const periodType = localStorage.getItem(PERIOD_KEY).replace(/\"/g, "");
            const compareType = localStorage.getItem(SORT_ORDER_KEY).replace(/\"/g, "");

            const fetchTasks = async () => {
                let body = JSON.stringify({
                    priority: 15,
                    taskStatuses: [],
                    categories: [category],
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
        [count]
    );

    return (
        <div className="task-components-wrap">
            {taskComponents}
        </div>
    )
}
