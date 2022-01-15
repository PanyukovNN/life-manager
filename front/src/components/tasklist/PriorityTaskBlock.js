import '../../App.css';
import {React, useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import {NO_TASKS_DIV, PRIORITY_2_DEFINITION_PLURAL} from '../../Constants'
import {Task} from "./Task";

/**
 * Блок со списком задач с соответствующим приоритетом
 *
 * @param priorityLetter буква приоритета
 * @param refreshTaskList функция обновления списка задач
 * @param tasks список задач
 * @param notifyAddTaskBtnClick функция нажатия на кнопку добавления новой задачи
 * @param notifyEditTaskBtnClick функция нажатия на кнопку редактирования задачи
 * @returns {*} компонент задачи
 */
export const PriorityTaskBlock = ({priorityLetter,
                                      refreshTaskList,
                                      tasks,
                                      notifyAddTaskBtnClick,
                                      notifyEditTaskBtnClick}) => {

    const [taskComponents, setTaskComponents] = useState();

    useEffect(
        () => {
            if (tasks.length === 0) {
                setTaskComponents([NO_TASKS_DIV]);

                return;
            }

            let renderedTaskComponents = [];
            tasks.forEach((task) => {
                renderedTaskComponents.push(
                    renderTask(task)
                )
            })

            setTaskComponents(renderedTaskComponents);
        },
        [tasks]
    );

    const renderTask = (task) => {
        return (
            <Task task={task}
                  refreshTaskList={refreshTaskList}
                  notifyEditBtnClick={notifyEditTaskBtnClick}
                  key={task.id}
            />)
    }

    return (
        <div className="priority-task-block">
            <div className="priority-task-block-header">
                {PRIORITY_2_DEFINITION_PLURAL[priorityLetter]}
            </div>

            {taskComponents}

            <Button className="add-task-button w-100"
                    variant="outline-secondary"
                    onClick={() => notifyAddTaskBtnClick(priorityLetter)}>
                Добавить
            </Button>
        </div>
    )
}
