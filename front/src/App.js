import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {React, useState} from 'react'
import {TaskList} from './components/TaskList'
import {AddTaskButtonModal} from './components/AddTaskButtonModal'
import {FiltrationForm} from "./components/FiltrationFormComponent";
import {Links} from "./components/Links";
import {DoneRemoveButtons} from "./components/DoneRemoveButtons";
import {FetchCategories} from './Utils'

function App() {

    const categories = FetchCategories();
    const [refreshTaskListCall, setFiltrationFormRefresh] = useState(0);
    const [checkedTaskIds, setCheckedTaskIds] = useState([]);

    return (
        <div className="App">
            <Links />

            <div className="filter-form-block">
                <div className="filter-block-header">Список задач</div>

                <FiltrationForm
                    categories={categories}
                    notifyRefresh={() => setFiltrationFormRefresh(refreshTaskListCall + 1)}/>
            </div>

            <div className="task-list-block">
                <TaskList
                    refreshTaskListCall={refreshTaskListCall}
                    handleCheck={(taskId) => setCheckedTaskIds(checkedTaskIds => [...checkedTaskIds, taskId])}/>

                <AddTaskButtonModal
                    categories={categories}
                    refreshTaskList={() => setFiltrationFormRefresh(refreshTaskListCall + 1)}/>

                <DoneRemoveButtons
                    checkedTaskIds={checkedTaskIds}
                    refreshTaskList={() => setFiltrationFormRefresh(refreshTaskListCall + 1)}/>
            </div>
        </div>
    );
}

export default App;
