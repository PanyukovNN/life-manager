import '../../App.css';
import {Task} from "./Task";
import {React, useEffect, useState} from 'react';
import {NO_ELEMENTS_DIV} from '../../Constants'
import {useAlert} from "react-alert";
import {postReq} from "../../services/RequestService";
import {PriorityTaskBlock} from "./PriorityTaskBlock";
import {TaskModal} from "./TaskModal";
import {getCurrentCategory} from "../../services/CategoryService";
import {setLoadingStart, setLoadingStop} from "../../services/Util";

/**
 * Загружает и формирует список задач
 *
 * @param refreshTaskListCall хук обновления списка задач
 * @param refreshTaskList функция обновления списка задач
 * @param taskStatus статус задач
 * @returns {*} список задач
 * @constructor
 */
export const PriorityTaskBlocksComponent = ({refreshTaskListCall,
                                                refreshTaskList,
                                                taskStatus}) => {
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

            setLoadingStart();

            const fetchTasks = async () => {
                let body = {
                    taskStatuses: taskStatus !== "" ? [taskStatus] : [],
                    categories: [getCurrentCategory()],
                    periodType: "ALL",
                    sortType: "NONE"
                };

                console.log(body)

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
                                      refreshTaskList={refreshTaskList}
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

                setLoadingStop();
            }

            fetchTasks();
        },
        [refreshTaskListCall]
    );

    const createUpdateTaskModal = <TaskModal
        refreshTaskList={refreshTaskList}
        showModalCall={showModalCall}
        task={modalTask}
        priorityLetter={modalPriority}/>

    return (
        <>
            <div className="task-component-blocks-wrap">
                {taskComponentBlocks}
            </div>

            {createUpdateTaskModal}
        </>
    )
}
