import '../App.css';
import {React, useState} from 'react';
import {TaskModal} from './TaskModal';
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
export const AddTaskButtonModal = ({refreshTaskList, categories}) => {

    // const [show, setShow] = useState(false);
    // const [date, setDate] = useState();
    // const [time, setTime] = useState();
    //
    // // Нажатие на кнопку добавления задачи
    // const handleClose = async () => setShow(false);
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
    // const handleShow = () => setShow(true);

    const [showCall, setShowCall] = useState(0);

    return (
        <>
            <Button className="add-task-button" variant="primary" onClick={() => setShowCall(showCall + 1)}>
                <span className="plus-sign">&#43;</span>
            </Button>

            <TaskModal showCall={showCall} categories={categories}  />
        </>
    )
}
