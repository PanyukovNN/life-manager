import './App.css';
import { Task } from './components/Task'
import { useEffect, useState } from 'react'

function App() {
    /*
        Необходимо:
        - добавить компонент задачи
        - добавить блок выбора приоритета
        - добавить кнопку "показать" (временно)
        - добавить возможность фильтра по параметрам из гет запроса
     */
    const [categoryOptions, setCategoryOptions] = useState([<option> </option>]);

    // localStorage.setItem();
    // localStorage.getItem();

    useEffect(
        () => {
            const fetchCategories = async () => {
                // запрашиваем список категорий
                const response = await fetch("http://localhost:80/api/category/find-all")
                const data = await response.json();

                // создаем функцию возврата элементов селектора в categoryOptions
                setCategoryOptions(() => {
                    let options = [];
                    data.forEach(category => options.push(
                        <option key={category.name} value={category.name}>{category.name}</option>
                    ));

                    return options;
                });
            }
            fetchCategories();
        },
        []
    );

    const [taskComponents, setTasks] = useState();

    useEffect(
        () => {
            const fetchTasks = async () => {
                // запрашиваем список задач
                const response = await fetch("http://localhost:80/api/task/find-all")
                const data = await response.json();

                // создаем функцию возврата компонентов задач
                setTasks(() => {
                    let taskComponents = [];
                    data.forEach(task => taskComponents.push(
                        <Task task={task} />
                    ));

                    return taskComponents;
                });
            }
            fetchTasks();
        },
        []
    );

    return (
        <div className="App">
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
                            {categoryOptions}
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

                <button>
                    Показать
                </button>
            </div>

            <div className="tasks-block">
                {taskComponents}
            </div>
        </div>
    );
}

export default App;
