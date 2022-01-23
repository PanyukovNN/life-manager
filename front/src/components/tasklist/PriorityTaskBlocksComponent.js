import '../../App.css';
import {React, useEffect, useState} from 'react';
import {PriorityTaskBlock} from "./PriorityTaskBlock";
import {TaskModal} from "./TaskModal";
import {setLoadingStart, setLoadingStop} from "../../services/Util";
import {fetchPriorityTaskListMap} from "../../services/TaskService";
import {getCurrentCategory} from "../../services/CategoryService";
import {NO_CATEGORIES_VALUE} from "../../Constants";

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
    const [priorityTaskBlocks, setPriorityTaskBlocks] = useState([]);
    const [showModalCall, setShowModalCall] = useState(0);
    const [modalTask, setModalTask] = useState(null);
    const [modalPriority, setModalPriority] = useState('A');
    const [priorityTaskListMap, setPriorityTaskListMap] = useState({});
    const [categoriesExists, setCategoriesExists] = useState(true);

    useEffect(
        () => {
            if (priorityTaskListMap === {}) {
                return;
            }

            let renderedPriorityTaskBlocks = [];

            for (const [priority, tasks] of Object.entries(priorityTaskListMap)) {
                renderedPriorityTaskBlocks.push(
                    renderPriorityTaskBlock(priority, tasks)
                );
            }

            setPriorityTaskBlocks(renderedPriorityTaskBlocks);
        },
        [priorityTaskListMap]
    );

    useEffect(
        () => {
            if (refreshTaskListCall === 0) {
                return;
            }

            let currentCategory = getCurrentCategory();

            if (getCurrentCategory() === "") {
                setCategoriesExists(false);

                return;
            }

            setLoadingStart();
            fetchPriorityTaskListMap(currentCategory, taskStatus)
                .then((priorityTaskListMapFromServer) => {
                    setPriorityTaskListMap(priorityTaskListMapFromServer);

                    setLoadingStop();
                })
        },
        [refreshTaskListCall]
    );

    const renderUpdateTaskModal = (
            <TaskModal
                refreshTaskList={refreshTaskList}
                showModalCall={showModalCall}
                task={modalTask}
                priority={modalPriority}/>
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
                notifyEditTaskBtnClick={task => {
                    setShowModalCall(call => call + 1);
                    setModalTask(task);
                }} />
        );
    }

    const renderPriorityTaskBlocks = (
        <div className="task-component-blocks-wrap">
            {priorityTaskBlocks}
        </div>
    );

    /**
     * Информационный блок, если не найдена ни одна категори
     */
    const renderAppendCategoryBlock = (
        <div className="task-component-blocks-wrap">
            <div>Для начала работы, вам необходимо <a href="/categories">добавить раздел</a>.</div>
        </div>
    );

    return (
        <>
            {categoriesExists && renderPriorityTaskBlocks}
            {!categoriesExists && renderAppendCategoryBlock}

            {renderUpdateTaskModal}
        </>
    )
}
