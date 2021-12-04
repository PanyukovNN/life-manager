import './App.css';
import { Modal, Button, FloatingLabel, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Task } from './components/Task'
import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

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

    let newTaskComponentsElement = [];

    const [show, setShow] = useState(false);

    // Нажатие на кнопку добавления задачи
    const handleClose = async () => setShow(false);
    const handleSave = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                description: taskText,
                priority: 'A1',
                category: 'Работа',
                status: "TO_DO"
            })
        };

        const response = await fetch('http://localhost:80/api/task/create-update', requestOptions);
        // Обработать потенциальную ошибку
        const task = await response.json();

        newTaskComponentsElement.push(<Task task={task} />);
        ReactDOM.render(newTaskComponentsElement, document.getElementById('newTaskComponentsWrap'));

        setShow(false);
    }
    const handleShow = () => setShow(true);

    let taskText = "";
    function handleChange(event) {
        taskText = event.target.value;
    }

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
                <div id="newTaskComponentsWrap" className="new-task-components-wrap"></div>
                <div className="task-components-wrap">
                    {taskComponents}
                </div>

                <Button className="add-task-button" variant="primary" onClick={handleShow}>
                    <span className="plus-sign">&#43;</span>
                </Button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Новая задача</Modal.Title>
                </Modal.Header>

                <div className="task-textarea-wrap">
                    <FloatingLabel id="taskTextarea" controlId="floatingTextarea2" label="Введите описание задачи">
                        <Form.Control
                            as="textarea"
                            placeholder=""
                            onChange={handleChange}
                            style={{ height: '100px' }}
                        />
                    </FloatingLabel>
                </div>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default App;
