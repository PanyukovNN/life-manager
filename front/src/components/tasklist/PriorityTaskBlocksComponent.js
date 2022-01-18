import '../../App.css';
import {React, useEffect, useState} from 'react';
import {PriorityTaskBlock} from "./PriorityTaskBlock";
import {TaskModal} from "./TaskModal";
import {setLoadingStart, setLoadingStop} from "../../services/Util";
import {fetchPriorityTaskListMap} from "../../services/TaskService";

/**
 * Единый компонент с блоками задач по приоритетам
 *
 * @param refreshTaskListCall хук обновления списка задач
 * @param refreshTaskList функция обновления списка задач
 * @param taskStatus статус задач
 * @returns список задач
 */
export const PriorityTaskBlocksComponent = ({refreshTaskListCall,
                                                refreshTaskList,
                                                taskStatus}) => {
    const [priorityTaskBlocks, setPriorityTaskBlocks] = useState();
    const [showModalCall, setShowModalCall] = useState(0);
    const [modalTask, setModalTask] = useState(null);
    const [modalPriority, setModalPriority] = useState('A');

    useEffect(
        () => {
            if (refreshTaskListCall === 0) {
                return;
            }

            setLoadingStart();

            const process = async () => {
                let priorityTaskListMap = await fetchPriorityTaskListMap(taskStatus);

                let renderedPriorityTaskBlocks = [];

                for (const [priority, tasks] of Object.entries(priorityTaskListMap)) {
                    renderedPriorityTaskBlocks.push(
                        renderPriorityTaskBlock(priority, tasks)
                    );
                }

                setPriorityTaskBlocks(renderedPriorityTaskBlocks);

                setLoadingStop();
            }

            process();
        },
        [refreshTaskListCall]
    );

    const renderPriorityTaskBlock = (priority, tasks) => {
        return (
            <PriorityTaskBlock
                priority={priority}
                refreshTaskList={refreshTaskList}
                taskStatus={taskStatus}
                tasks={tasks}
                notifyAddTaskBtnClick={(chosenPriority) => {
                    setShowModalCall(call => call + 1);
                    setModalTask(null);
                    setModalPriority(chosenPriority);
                }}
                notifyEditButtonClick={task => {
                    setShowModalCall(call => call + 1);
                    setModalTask(task);
                }} />
        );
    }

    const renderUpdateTaskModal = () => {
        return (<TaskModal
            refreshTaskList={refreshTaskList}
            showModalCall={showModalCall}
            task={modalTask}
            priority={modalPriority}/>)
    }

    return (
        <>
            <div className="task-component-blocks-wrap">
                {priorityTaskBlocks}
            </div>

            {renderUpdateTaskModal()}
        </>
    )
}
