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
import {TaskModal} from "./TaskModal";

/**
 * Загружает и формирует список задач
 *
 * @param refreshTaskListCall хук обновления списка задач
 * @param refreshTaskList функция обновления списка задач
 * @param handleCheck обработка выбора задачи
 * @param taskStatus статус задач
 * @param spinnerCall хук показа спиннера загрузки
 * @param categories список категорий
 * @returns {*} список задач
 * @constructor
 */
export const PriorityTaskBlocksComponent = ({refreshTaskListCall,
                                                refreshTaskList,
                                                handleCheck,
                                                taskStatus,
                                                showSpinner,
                                                categories}) => {
    const alert = useAlert();
    const [taskComponentBlocks, setTaskComponentBlocks] = useState();
    const [showModalCall, setShowModalCall] = useState(0);
    const [modalTask, setModalTask] = useState(null);
    const [modalPriority, setModalPriority] = useState('A');

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
                                      notifyEditBtnClick={task => {
                                          setShowModalCall(showModalCall => showModalCall + 1);
                                          setModalTask(task);
                                      }}
                                      key={task.id}/>
                            )
                        })

                        taskComponentBlocks.push(
                            <PriorityTaskBlock
                                priorityLetter={priorityLetter}
                                taskComponents={taskComponents}
                                showModal={(chosenPriorityLetter) => {
                                    setShowModalCall(showModalCall => showModalCall + 1);
                                    setModalTask(null);
                                    setModalPriority(chosenPriorityLetter);
                                }} />
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

    const createUpdateTaskModal = <TaskModal
        refreshTaskList={refreshTaskList}
        showModalCall={showModalCall}
        task={modalTask}
        categories={categories}
        modalPriority={modalPriority}/>

    return (
        <>
            <div className="task-component-blocks-wrap">
                {taskComponentBlocks}
            </div>

            {createUpdateTaskModal}
        </>
    )
}
