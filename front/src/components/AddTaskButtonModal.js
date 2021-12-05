import '../App.css';
import {React, useState} from 'react';
import {Button, FloatingLabel, Form, Modal} from "react-bootstrap";
import {Task} from './Task';
import {SelectorComponent} from "./SelectorComponent";

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
                priority: priorityLetter + priorityDigit,
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
    function handleDescriptionChange(event) {
        taskText = event.target.value;
    }

    let priorityLetter = "A";
    function handlePriorityLetterChange(value) {
        priorityLetter = value;
    }

    let priorityDigit = "1";
    function handlePriorityDigitChange(value) {
        priorityDigit = value;
        console.log(priorityDigit)
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
                            onChange={handleDescriptionChange}
                            style={{ height: '100px' }}
                        />
                    </FloatingLabel>
                </div>

                {/* Селектор буквы приоритета */}
                <div className="selector-block">
                    <div className="selector-header">Приоритет:</div>
                    <div className="selector-wrapper">
                        <SelectorComponent
                            optionMap={{
                                "A" : "A",
                                "B" : "B",
                                "C" : "C",
                                "D" : "D"}}
                            notifySelection={(selected) => handlePriorityLetterChange(selected)}/>
                    </div>
                </div>

                {/* Селектор цифры приоритета */}
                <div className="selector-block">
                    <div className="selector-header">Порядок:</div>
                    <div className="selector-wrapper">
                        <SelectorComponent
                            optionMap={{
                                "1" : "1",
                                "2" : "2",
                                "3" : "3",
                                "4" : "4"}}
                            notifySelection={(selected) => handlePriorityDigitChange(selected)}/>
                    </div>
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
