import '../App.css';
import {React, useState} from 'react'
import {Button} from "react-bootstrap";
import {FetchCategoriesMap} from "../Utils";
import {TaskModal} from "../components/tasklist/TaskModal";
import {DoneRemoveButtons} from "../components/tasklist/DoneRemoveButtons";
import {TaskListComponent} from "../components/tasklist/TaskListComponent";
import {FiltrationForm} from "../components/tasklist/FiltrationFormComponent";

/**
 * Главная страница со списком задачи и формой фильтрации
 *
 * @returns {*} главная страница со списком задач
 * @constructor
 */
export const TaskListPage = () => {

    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState({});
    FetchCategoriesMap(setLoading, setCategories);

    const [checkedTaskIds, setCheckedTaskIds] = useState([]);
    const [refreshTaskListCall, setFiltrationFormRefresh] = useState(0);
    const [showModalCall, setShowModalCall] = useState(0);
    const [modalTask, setModalTask] = useState(null);

    if (loading) {
        return (
            <div>Loading...</div>
        );
    }

    return (
        <div className="TaskListPage">
            <div className="filter-form-block">
                <div className="filter-block-header">Список задач</div>

                <FiltrationForm
                    categories={categories}
                    notifyRefresh={() => setFiltrationFormRefresh(refreshTaskListCall => refreshTaskListCall + 1)}/>
            </div>

            <div className="task-list-block">
                <TaskListComponent
                    refreshTaskListCall={refreshTaskListCall}
                    notifyUpdateTaskClick={(task) => {
                        setShowModalCall(showModalCall => showModalCall + 1);
                        setModalTask(task);
                    }}
                    handleCheck={(taskId) => setCheckedTaskIds(checkedTaskIds => [...checkedTaskIds, taskId])}/>

                <Button className="add-task-button"
                        variant="primary"
                        onClick={() => {
                            setShowModalCall(showModalCall => showModalCall + 1);
                            setModalTask(null);}}>
                    <span className="plus-sign">&#43;</span>
                </Button>

                <TaskModal refreshTaskList={() => setFiltrationFormRefresh(refreshTaskListCall => refreshTaskListCall + 1)}
                           showModalCall={showModalCall}
                           task={modalTask}
                           categories={categories}  />

                <DoneRemoveButtons
                    checkedTaskIds={checkedTaskIds}
                    refreshTaskList={() => setFiltrationFormRefresh(refreshTaskListCall => refreshTaskListCall + 1)}/>
            </div>
        </div>
    );
}
