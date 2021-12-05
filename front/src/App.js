import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react'
import {TaskList} from './components/TaskList'
import {AddTaskButtonModal} from './components/AddTaskButtonModal'
import {SelectorComponent} from './components/SelectorComponent'
import {SelectorCategoryComponent} from './components/SelectorCategoryComponent'

const PERIOD_KEY     = "period";
const CATEGORY_KEY   = "category";
const PRIORITY_KEY   = "priority";
const SORT_ORDER_KEY = "sortOrder";

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

                {/* Селектор категорий */}
                <SelectorCategoryComponent
                    storageKey={CATEGORY_KEY}
                    header={"Раздел:"}/>

                {/* Селектор приоритета */}
                <SelectorComponent
                    storageKey={PRIORITY_KEY}
                    header={"Приоритет:"}
                    optionMap={{"ALL" : "Любой",
                        "A" : "A",
                        "B" : "B",
                        "C" : "C",
                        "D" : "D"}}/>

                {/* Селектор периода */}
                <SelectorComponent
                    storageKey={PERIOD_KEY}
                    header={"За период:"}
                    optionMap={{"ALL" : "Все время",
                        "DAY"   : "День",
                        "WEEK"  : "Неделя",
                        "MONTH" : "Месяц"}}/>

                {/* Селектор сортировки */}
                <SelectorComponent
                    storageKey={SORT_ORDER_KEY}
                    header={"Сортировать по:"}
                    optionMap={{"ALL" : "Все время",
                        "PRIORITY_FIRST"   : "Приоритету",
                        "DATE_FIRST"       : "Дате исполнения",
                        "DATE_ADDED_FIRST" : "Дате добавления"}}/>
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
