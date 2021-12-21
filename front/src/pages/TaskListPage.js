import '../App.css';
import {React, useState} from 'react'
import {Button} from "react-bootstrap";
import {convertRawCategoriesToMap, FetchRawCategories} from "../Utils";
import {TaskModal} from "../components/tasklist/TaskModal";
import {DoneRemoveTaskButtons} from "../components/tasklist/DoneRemoveButtons";
import {TaskListComponent} from "../components/tasklist/TaskListComponent";
import {FiltrationForm} from "../components/tasklist/FiltrationFormComponent";
import {LoadingPage} from "./LoadingPage";
import {useAlert} from "react-alert";

/**
 * Главная страница со списком задачи и формой фильтрации
 *
 * @param spinnerCall хук показа спиннера загрузки
 * @returns {*} главная страница со списком задач
 * @constructor
 */
export const TaskListPage = ({showSpinner}) => {

    const alert = useAlert();
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState({});
    FetchRawCategories(
        setLoading,
        (rawCategories) => {
            setCategories(convertRawCategoriesToMap(rawCategories));
        },
        undefined,
        undefined,
        alert);

    const [checkedTaskIds, setCheckedTaskIds] = useState([]);
    const [refreshTaskListCall, setFiltrationFormRefresh] = useState(0);
    const [showModalCall, setShowModalCall] = useState(0);
    const [modalTask, setModalTask] = useState(null);


    return (
        <div className="TaskListPage">
            <div className="filter-form-block">
                <div className="filter-block-header">Список задач</div>

                <FiltrationForm
                    categories={categories}
                    loading={loading}
                    notifyRefresh={() => setFiltrationFormRefresh(refreshTaskListCall => refreshTaskListCall + 1)}/>
            </div>

            <div className="task-list-block">
                <TaskListComponent
                    refreshTaskListCall={refreshTaskListCall}
                    notifyUpdateTaskClick={(task) => {
                        setShowModalCall(showModalCall => showModalCall + 1);
                        setModalTask(task);
                    }}
                    handleCheck={(taskId) => setCheckedTaskIds(checkedTaskIds => [...checkedTaskIds, taskId])}
                    showSpinner={showSpinner}/>

                <Button className="add-task-button"
                        variant="primary"
                        disabled={loading}
                        onClick={() => {
                            setShowModalCall(showModalCall => showModalCall + 1);
                            setModalTask(null);}}>
                    <span className="plus-sign">&#43;</span>
                </Button>

                <TaskModal refreshTaskList={() => setFiltrationFormRefresh(refreshTaskListCall => refreshTaskListCall + 1)}
                           showModalCall={showModalCall}
                           task={modalTask}
                           categories={categories}  />

                <DoneRemoveTaskButtons
                    disabled={loading}
                    checkedTaskIds={checkedTaskIds}
                    refreshTaskList={() => setFiltrationFormRefresh(refreshTaskListCall => refreshTaskListCall + 1)}/>
            </div>
        </div>
    );
}
