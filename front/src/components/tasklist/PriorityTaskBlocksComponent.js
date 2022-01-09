import '../../App.css';
import {Task} from "./Task";
import {React, useEffect, useState} from 'react';
import {
    CATEGORY_SELECT_ID,
    COMPARE_TO_SELECT_ID,
    NO_ELEMENTS_DIV
} from '../../Constants'
import {useAlert} from "react-alert";
import {postReq} from "../../services/RequestService";
import {PriorityTaskBlock} from "./PriorityTaskBlock";

/**
 * Загружает и формирует список задач
 *
 * @param refreshTaskListCall хук обновления списка задач
 * @param handleCheck обработка выбора задачи
 * @param notifyUpdateTaskClick функция клика на кнопке редактирования задачи
 * @param taskStatus статус задач
 * @param spinnerCall хук показа спиннера загрузки
 * @returns {*} список задач
 * @constructor
 */
export const PriorityTaskBlocksComponent = ({refreshTaskListCall, handleCheck, notifyUpdateTaskClick, taskStatus, showSpinner}) => {
    const alert = useAlert();
    const [taskComponentBlocks, setTaskComponentBlocks] = useState();

    useEffect(
        () => {
            if (refreshTaskListCall === 0) {
                return;
            }

            showSpinner(true);

            const category = document.getElementById(CATEGORY_SELECT_ID).selectedOptions[0].value;
            const compareType = document.getElementById(COMPARE_TO_SELECT_ID).selectedOptions[0].value;

            const fetchTasks = async () => {
                let body = {
                    taskStatuses: taskStatus !== "" ? [taskStatus] : [],
                    categories: category !== "" ? [category] : [],
                    periodType: "ALL",
                    compareType: compareType !== "" ? compareType : "PRIORITY_FIRST"
                };

                let priorityTaskListMap = await postReq("http://localhost:80/api/task/find-priority-task-list-map", body, alert)
                    .then(response => {
                        if (response && response.data) {
                            return response.data;
                        }

                        return null;
                    });

                setTaskComponentBlocks(() => {
                    let taskComponentBlocks = [];

                    if (!priorityTaskListMap || priorityTaskListMap.length === 0) {
                        return NO_ELEMENTS_DIV;
                    }

                    for (const [priorityLetter, tasks] of Object.entries(priorityTaskListMap)) {
                        let taskComponents = [];

                        tasks.forEach(task => {
                            taskComponents.push(
                                <Task task={task}
                                      handleCheck={handleCheck}
                                      notifyEditBtnClick={(task) => notifyUpdateTaskClick(task)}
                                      key={task.id}/>
                            )
                        })

                        taskComponentBlocks.push(
                            <PriorityTaskBlock
                                priorityLetter={priorityLetter}
                                taskComponents={taskComponents} />
                        );
                    }

                    return taskComponentBlocks;
                });

                showSpinner(false);
            }

            fetchTasks();
        },
        [refreshTaskListCall]
    );

    return (
        <div className="task-component-blocks-wrap">
            {taskComponentBlocks}
        </div>
    )
}
