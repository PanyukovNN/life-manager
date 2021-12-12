import '../App.css';
import {React, useState, useEffect} from 'react'
import {Button} from "react-bootstrap";
import {FetchRawCategories, ConvertRawCategoriesToMap} from "../Utils";
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
    const rawCategories = FetchRawCategories(setLoading);

    useEffect(() => {
        if (!loading) {
            setCategories(() => ConvertRawCategoriesToMap(rawCategories));
        }
    }, [loading]);

    const [checkedTaskIds, setCheckedTaskIds] = useState([]);
    const [refreshTaskListCall, setFiltrationFormRefresh] = useState(0);
    const [showCall, setShowCall] = useState(0);
    const [task, setTask] = useState(null);

    if (loading) {
        return (
            <span>Loading...</span>
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
                        setShowCall(showCall => showCall + 1);
                        setTask(task);
                    }}
                    handleCheck={(taskId) => setCheckedTaskIds(checkedTaskIds => [...checkedTaskIds, taskId])}/>

                <Button className="add-task-button"
                        variant="primary"
                        onClick={() => {
                            setShowCall(showCall => showCall + 1);
                            setTask(null);}}>
                    <span className="plus-sign">&#43;</span>
                </Button>

                <TaskModal refreshTaskList={() => setFiltrationFormRefresh(refreshTaskListCall + 1)}
                           showCall={showCall}
                           task={task}
                           categories={categories}  />

                <DoneRemoveButtons
                    checkedTaskIds={checkedTaskIds}
                    refreshTaskList={() => setFiltrationFormRefresh(refreshTaskListCall + 1)}/>
            </div>
        </div>
    );
}
