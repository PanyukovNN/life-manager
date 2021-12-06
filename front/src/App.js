import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {React, useState} from 'react'
import {TaskList} from './components/TaskList'
import {AddTaskButtonModal} from './components/AddTaskButtonModal'
import {FiltrationForm} from "./components/FiltrationFormComponent";
import {FetchCategories} from './Utils'

function App() {

    // хук обновления формы фильтрации
    const [taskListUpdateCall, setFiltrationFormRefresh] = useState(0);

    const categories = FetchCategories();

    return (
        <div className="App">
            <link
                rel = "stylesheet"
                href = "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
                integrity = "sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
                crossOrigin = "anonymous"/>

            <div className="filter-block">
                <div className="filter-block-header">
                    Список задач
                </div>

                <FiltrationForm
                    categories={categories}
                    notifyRefresh={() => setFiltrationFormRefresh(taskListUpdateCall + 1)}/>
            </div>

            <div className="tasks-block">
                <TaskList
                    count={taskListUpdateCall}/>

                <AddTaskButtonModal
                    categories={categories}
                    refreshTaskList={() => setFiltrationFormRefresh(taskListUpdateCall + 1)}/>
            </div>
        </div>
    );
}

export default App;
