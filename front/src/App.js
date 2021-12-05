import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {React, useState} from 'react'
import {TaskList} from './components/TaskList'
import {CategoryOptions} from './components/CategoryOptions'
import {AddTaskButtonModal} from './components/AddTaskButtonModal'

function App() {

    const [newTaskComponentsElement, setNewTaskComponentsElement] = useState([]);

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

                <div className="selector-block">
                    <div className="selector-header">
                        Раздел:
                    </div>
                    <div className="selector-wrapper">
                        <select size="1">
                            <CategoryOptions />
                        </select>
                    </div>
                </div>

                <div className="selector-block">
                    <div className="selector-header">
                        Приоритет:
                    </div>
                    <div className="selector-wrapper">
                        <select size="1">
                            <option>Любой</option>
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                            <option>D</option>
                        </select>
                    </div>
                </div>

                <div className="selector-block">
                    <div className="selector-header">
                        За период:
                    </div>
                    <div className="selector-wrapper">
                        <select size="1">
                            <option>Все время</option>
                            <option>День</option>
                            <option>Неделя</option>
                            <option>Месяц</option>
                        </select>
                    </div>
                </div>

                <div className="selector-block">
                    <div className="selector-header">
                        Сортировать по:
                    </div>
                    <div className="selector-wrapper">
                        <select size="1">
                            <option>Приоритету</option>
                            <option>Дате исполнения</option>
                            <option>Дате добавления</option>
                        </select>
                    </div>
                </div>

            </div>

            <div className="tasks-block">
                <div id="newTaskComponentsWrap" className="new-task-components-wrap">
                    {newTaskComponentsElement}
                </div>
                <TaskList/>

                <AddTaskButtonModal
                    appendNewTask={(taskComponent) => {
                        setNewTaskComponentsElement(
                            newTaskComponentsElement => [...newTaskComponentsElement, taskComponent]
                        );
                    }}/>
            </div>
        </div>
    );
}

export default App;
