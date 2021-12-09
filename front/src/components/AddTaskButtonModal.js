import '../App.css';
import {React, useState} from 'react';
import {SelectorComponent} from "./SelectorComponent";
import {TimePicker, DatePicker} from 'react-tempusdominus-bootstrap';
import {Button, FloatingLabel, Form, Modal} from "react-bootstrap";
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
    const [date, setDate] = useState();
    const [time, setTime] = useState();

    // Нажатие на кнопку добавления задачи
    const handleClose = async () => setShow(false);
    const handleSave = async () => {
        let description = document.getElementById(DESCRIPTION_TEXTAREA_ID).value;

        if (description === null || description === "") {
            return;
        }

        let category = document.getElementById(MODAL_CATEGORY_SELECT_ID).selectedOptions[0].value;
        let priorityLetter = document.getElementById(MODAL_PRIORITY_LETTER_SELECT_ID).selectedOptions[0].value;
        let priorityDigit = document.getElementById(MODAL_PRIORITY_DIGIT_SELECT_ID).selectedOptions[0].value;

        let body = {
            description: description,
            priority: priorityLetter + priorityDigit,
            category: category,
            status: TO_DO_TASK_STATUS,
            completionDate: date,
            completionTime: time
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
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

                <div className="add-task-inputs-wrap">
                    {/* Поле ввода текста задачи */}
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

                    <div className="modal-selectors-group-wrap">
                        {/* Селектор раздела */}
                        <div className="modal-selector-block">
                            <div className="modal-selector-header">Раздел:</div>
                            <div className="modal-selector-wrapper">
                                <SelectorComponent
                                    id={MODAL_CATEGORY_SELECT_ID}
                                    optionMap={categories}
                                    notifySelection={() => {}}/>
                            </div>
                        </div>

                        {/* Селектор буквы приоритета */}
                        <div className="modal-selector-block">
                            <div className="modal-selector-header">Приоритет:</div>
                            <div className="modal-priority-selector-wrapper">
                                <SelectorComponent
                                    id={MODAL_PRIORITY_LETTER_SELECT_ID}
                                    optionMap={{
                                        "A" : "A",
                                        "B" : "B",
                                        "C" : "C",
                                        "D" : "D"}}
                                    notifySelection={() => {}}/>
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
                    </div>

                    <div className="modal-selectors-group-wrap">
                        <div className="modal-selector-block">
                            <div className="modal-selector-header">Дата:</div>
                            <DatePicker format={"DD.MM.YYYY"} onChange={(e) => {
                                if (e.data !== undefined) {
                                    setDate(e.date.format("DD-MM-YYYY"))
                                }
                            }}/>
                        </div>
                        <div className="modal-selector-block">
                            <div className="modal-selector-header">Время:</div>
                            <TimePicker format={"HH:mm"} stepping={30} onChange={(e) => {
                                if (e.data !== undefined) {
                                    setTime(e.date.format("HH:mm"))
                                }
                            }}/>
                        </div>
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
