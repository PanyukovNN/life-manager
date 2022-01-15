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

                for (const [priorityLetter, tasks] of Object.entries(priorityTaskListMap)) {
                    renderedPriorityTaskBlocks.push(
                        renderPriorityTaskBlock(priorityLetter, tasks)
                    );
                }

                setPriorityTaskBlocks(renderedPriorityTaskBlocks);

                setLoadingStop();
            }

            process();
        },
        [refreshTaskListCall]
    );

    const renderPriorityTaskBlock = (priorityLetter, tasks) => {
        return (
            <PriorityTaskBlock
                priorityLetter={priorityLetter}
                refreshTaskList={refreshTaskList}
                taskStatus={taskStatus}
                tasks={tasks}
                notifyAddTaskBtnClick={(chosenPriorityLetter) => {
                    setShowModalCall(call => call + 1);
                    setModalTask(null);
                    setModalPriority(chosenPriorityLetter);
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
            priorityLetter={modalPriority}/>)
    }

    return (
        <>
            <div className="task-component-blocks-wrap">
                {priorityTaskBlocks}
            </div>

            {renderUpdateTaskModal}
        </>
    )
}
