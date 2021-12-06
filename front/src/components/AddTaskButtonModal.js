import '../App.css';
import {React, useState} from 'react';
import {Button, FloatingLabel, Form, Modal} from "react-bootstrap";
import {SelectorComponent} from "./SelectorComponent";
import {DESCRIPTION_TEXTAREA_ID, MODAL_CATEGORY_SELECT_ID, MODAL_PRIORITY_LETTER_SELECT_ID,
    MODAL_PRIORITY_DIGIT_SELECT_ID, TO_DO_TASK_STATUS} from "../Constants";

/**
 * Кнопка с открытием модального окна добавления задачи
 *
 * @param appendNewTask функция добавления новой задачи
 * @param categories список категорий
 * @returns {*} кнопку с модальным окном
 * @constructor
 */
export const AddTaskButtonModal = ({refreshTaskList, categories}) => {

    const [show, setShow] = useState(false);

    // Нажатие на кнопку добавления задачи
    const handleClose = async () => setShow(false);
    const handleSave = async () => {
        let description = document.getElementById(DESCRIPTION_TEXTAREA_ID).value;
        let category = document.getElementById(MODAL_CATEGORY_SELECT_ID).selectedOptions[0].value;
        let priorityLetter = document.getElementById(MODAL_PRIORITY_LETTER_SELECT_ID).selectedOptions[0].value;
        let priorityDigit = document.getElementById(MODAL_PRIORITY_DIGIT_SELECT_ID).selectedOptions[0].value;

        let body = JSON.stringify({
            description: description,
            priority: priorityLetter + priorityDigit,
            category: category,
            status: TO_DO_TASK_STATUS
        });

        console.log(body)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body
        };

        const response = await fetch('http://localhost:80/api/task/create-update', requestOptions);
        // Возвращает задачу
        await response.json();

        setShow(false);

        refreshTaskList();
    }
    const handleShow = () => setShow(true);

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
                            id={DESCRIPTION_TEXTAREA_ID}
                            as="textarea"
                            placeholder=""
                            style={{ height: '100px' }}
                        />
                    </FloatingLabel>
                </div>

                {/* Селектор категории */}
                <div className="selector-block">
                    <div className="selector-header">Раздел:</div>
                    <div className="selector-wrapper">
                        <SelectorComponent
                            id={MODAL_CATEGORY_SELECT_ID}
                            optionMap={categories}
                            notifySelection={() => {}}/>
                    </div>
                </div>

                {/* Селектор буквы приоритета */}
                <div className="selector-block">
                    <div className="selector-header">Приоритет:</div>
                    <div className="selector-wrapper">
                        <SelectorComponent
                            id={MODAL_PRIORITY_LETTER_SELECT_ID}
                            optionMap={{
                                "A" : "A",
                                "B" : "B",
                                "C" : "C",
                                "D" : "D"}}
                            notifySelection={() => {}}/>
                    </div>
                </div>

                {/* Селектор цифры приоритета */}
                <div className="selector-block">
                    <div className="selector-header">Порядок:</div>
                    <div className="selector-wrapper">
                        <SelectorComponent
                            id={MODAL_PRIORITY_DIGIT_SELECT_ID}
                            optionMap={{
                                "1" : "1",
                                "2" : "2",
                                "3" : "3",
                                "4" : "4"}}
                            notifySelection={() => {}}/>
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
