import '../App.css';
import {React, useEffect, useState} from 'react';
import {Task} from "./Task";

export const TaskList = () => {
    const [taskComponents, setTasks] = useState();

    useEffect(
        () => {
            const fetchTasks = async () => {
                // запрашиваем список задач
                const response = await fetch("http://localhost:80/api/task/find-all")
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
        []
    );

    return (
        <div className="task-components-wrap">
            {taskComponents}
        </div>
    )
}
