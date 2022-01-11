import '../../App.css';
import {React, useEffect, useState} from 'react';
import {SelectorComponent} from "../filtrationform/SelectorComponent";
import {TimePicker, DatePicker} from 'react-tempusdominus-bootstrap';
import {Button, FloatingLabel, Form, Modal} from "react-bootstrap";
import {
    DESCRIPTION_TEXTAREA_ID, MODAL_CATEGORY_SELECT_ID, MODAL_PRIORITY_LETTER_SELECT_ID,
    MODAL_PRIORITY_DIGIT_SELECT_ID, TO_DO_TASK_STATUS, PRIORITY_2_DEFINITION
} from "../../Constants";
import {useAlert} from "react-alert";
import {postReq} from "../../services/RequestService";

/**
 * Кнопка с открытием модального окна добавления задачи
 *
 * @param refreshTaskList функция обновления списка задач
 * @param showModalCall хук показа окна
 * @param category категория
 * @param task задача
 * @param priorityLetter буква приоритета
 * @returns {*} кнопку с модальным окном
 * @constructor
 */
export const TaskModal = ({refreshTaskList, showModalCall, category, task, priorityLetter}) => {

    const alert = useAlert();
    const [show, setShow] = useState(false);
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const handleClose = async () => setShow(false);

    useEffect(
        () => {
            // Прерываем запуск useEffect при рендере
            if (showModalCall === 0) {
                return;
            }

            setDate(task !== null ? task.plannedDate : "")
            setTime(task !== null ? task.plannedTime : "")

            setShow(true);
        },
        [showModalCall]
    );

    // Нажатие на кнопку добавления задачи
    const handleSave = async () => {
        let description = document.getElementById(DESCRIPTION_TEXTAREA_ID).value;

        if (description === null || description === "") {
            return;
        }

        let id = task ? task.id : null;

        let body = {
            id: id,
            description: description,
            priority: priorityLetter + 1,
            category: category,
            status: TO_DO_TASK_STATUS,
            plannedDate: date,
            plannedTime: time
        };

        await postReq('http://localhost:80/api/task/create-update', body, alert)
            .then(response => {
                if (response && response.data) {
                    alert.show(response.data)
                }
            });

        refreshTaskList();
        setShow(false);
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {task
                            ? "Редактировать задачу в разделе \"" + category + "\""
                            : "Новая задача в разделе \"" + category + "\""}
                    </Modal.Title>
                </Modal.Header>

                <div className="task-modal-priority-wrap">
                    Приоритет: {PRIORITY_2_DEFINITION[priorityLetter]}
                </div>

                <div className="add-task-inputs-wrap">
                    {/* Поле ввода текста задачи */}
                    <div className="task-textarea-wrap">
                        <FloatingLabel id="taskTextarea" controlId="floatingTextarea2" label="Описание задачи">
                            <Form.Control
                                id={DESCRIPTION_TEXTAREA_ID}
                                as="textarea"
                                placeholder=""
                                defaultValue={task ? task.description : ""}
                                style={{ height: '100px' }}
                            />
                        </FloatingLabel>
                    </div>

                    <div className="modal-selectors-group-wrap">
                        <div className="modal-selector-block">
                            <div className="modal-selector-header">Дата:</div>
                            <DatePicker format={"DD.MM.YYYY"}
                                        date={date}
                                        onChange={(e) => {
                                            if (e.date !== undefined) {
                                                setDate(e.date.format("DD.MM.YYYY"));
                                            }
                                        }}/>
                        </div>
                        <div className="modal-selector-block">
                            <div className="modal-selector-header">Время:</div>
                            <TimePicker format={"HH:mm"}
                                        stepping={30}
                                        date={time}
                                        onChange={(e) => {
                                            if (e.date !== undefined) {
                                                setTime(e.date.format("HH:mm"));
                                            }
                                        }}/>
                        </div>
                    </div>
                </div>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary"
                            onClick={() => handleSave()}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
