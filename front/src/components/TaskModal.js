import '../App.css';
import {React, useEffect, useState} from 'react';
import {SelectorComponent} from "./SelectorComponent";
import {TimePicker, DatePicker} from 'react-tempusdominus-bootstrap';
import {Button, FloatingLabel, Form, Modal} from "react-bootstrap";
import {DESCRIPTION_TEXTAREA_ID, MODAL_CATEGORY_SELECT_ID, MODAL_PRIORITY_LETTER_SELECT_ID,
    MODAL_PRIORITY_DIGIT_SELECT_ID, TO_DO_TASK_STATUS} from "../Constants";

/**
 * Кнопка с открытием модального окна добавления задачи
 *
 * @param refreshTaskList функция обновления списка задач
 * @param categories список категорий
 * @returns {*} кнопку с модальным окном
 * @constructor
 */
export const TaskModal = ({showCall, refreshTaskList, callSave, categories, task}) => {

    const [show, setShow] = useState(false);
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [priorityLetter, setPriorityLetter] = useState();
    const [priorityDigit, setPriorityDigit] = useState();

    const handleClose = async () => setShow(false);

    // Прерываем запуск useEffect при рендере
    const [skipMountShow, setSkipMountShow] = useState(true);
    useEffect(
        (showCall) => {
            if (skipMountShow) {
                setSkipMountShow(false);
            }

            if (!skipMountShow) {
                setShow(true);
            }

            console.log(priorityLetter)
            console.log(priorityDigit)
        },
        [showCall]
    );

    const handleSave = () => {};
    // const handleSave = async () => {
    //     let description = document.getElementById(DESCRIPTION_TEXTAREA_ID).value;
    //
    //     if (description === null || description === "") {
    //         return;
    //     }
    //
    //     let category = document.getElementById(MODAL_CATEGORY_SELECT_ID).selectedOptions[0].value;
    //     let priorityLetter = document.getElementById(MODAL_PRIORITY_LETTER_SELECT_ID).selectedOptions[0].value;
    //     let priorityDigit = document.getElementById(MODAL_PRIORITY_DIGIT_SELECT_ID).selectedOptions[0].value;
    //
    //     let body = {
    //         description: description,
    //         priority: priorityLetter + priorityDigit,
    //         category: category,
    //         status: TO_DO_TASK_STATUS,
    //         completionDate: date,
    //         completionTime: time
    //     };
    //
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(body)
    //     };
    //
    //     const response = await fetch('http://localhost:80/api/task/create-update', requestOptions);
    //     // Возвращает задачу
    //     await response.json();
    //
    //     setShow(false);
    //
    //     refreshTaskList();
    // }

    return (
        <>
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
                                    // id={MODAL_PRIORITY_LETTER_SELECT_ID}
                                    optionMap={{
                                        "A" : "A",
                                        "B" : "B",
                                        "C" : "C",
                                        "D" : "D"}}
                                    notifySelection={(selected) => {setPriorityLetter(selected)}}/>
                                <SelectorComponent
                                    // id={MODAL_PRIORITY_DIGIT_SELECT_ID}
                                    optionMap={{
                                        "1" : "1",
                                        "2" : "2",
                                        "3" : "3",
                                        "4" : "4"}}
                                    notifySelection={(selected) => {setPriorityDigit(selected)}}/>
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
                    <Button variant="primary" onClick={() => handleSave()}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
