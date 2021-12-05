import '../App.css';
import {React, useState} from 'react';
import {Button, FloatingLabel, Form, Modal} from "react-bootstrap";
import {Task} from './Task';

/**
 * Кнопка с открытием модального окна добавления задачи
 *
 * @param appendNewTask функция добавления новой задачи
 * @returns {*} кнопку с модальным окном
 * @constructor
 */
export const AddTaskButtonModal = ({appendNewTask}) => {

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

        appendNewTask(<Task task={task} />);

        setShow(false);
    }
    const handleShow = () => setShow(true);

    let taskText = "";
    function handleChange(event) {
        taskText = event.target.value;
    }

    return (
        <>
            <Button className="add-task-button" variant="primary" onClick={handleShow}>
                <span className="plus-sign">&#43;</span>
            </Button>

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
        </>
    )
}
