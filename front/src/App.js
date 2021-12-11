import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {React, useEffect, useState} from 'react'
import {TaskList} from './components/TaskList'
import {FiltrationForm} from "./components/FiltrationFormComponent";
import {Links} from "./components/Links";
import {DoneRemoveButtons} from "./components/DoneRemoveButtons";
import {TaskModal} from "./components/TaskModal";
import {FetchCategories} from './Utils'
import {Button} from "react-bootstrap";

function App() {

    // const categories = FetchCategories();

    const [categories, setCategories] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(
        () => {
            fetch("http://localhost:80/api/category/find-all")
                .then(res => res.json())
                .then(data => {

                    setCategories(() => {
                        let categoryMap = {};
                        data.forEach(category => categoryMap[category.name] = category.name);

                        return categoryMap;
                    })

                    setLoading(false);
                })
        },
        []);

    const [checkedTaskIds, setCheckedTaskIds] = useState([]);
    const [refreshTaskListCall, setFiltrationFormRefresh] = useState(0);
    const [showCall, setShowCall] = useState(0);
    const [task, setTask] = useState(null);

    if (loading) {
        return (
            <span>Loading</span>
        );
    }

    return (
        <div className="App">
            <Links />

            <div className="filter-form-block">
                <div className="filter-block-header">Список задач</div>

                <FiltrationForm
                    categories={categories}
                    notifyRefresh={() => setFiltrationFormRefresh(refreshTaskListCall => refreshTaskListCall + 1)}/>
            </div>

            <div className="task-list-block">
                <TaskList
                    refreshTaskListCall={refreshTaskListCall}
                    notifyUpdateTaskClick={(task) => {
                        setShowCall(showCall => showCall + 1);
                        setTask(task);
                    }}
                    handleCheck={(taskId) => setCheckedTaskIds(checkedTaskIds => [...checkedTaskIds, taskId])}/>

                <Button className="add-task-button" variant="primary" onClick={() => {
                    setShowCall(showCall => showCall + 1);
                    setTask(null);
                }}>
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

export default App;
