import '../../App.css';
import {React, useEffect, useState} from 'react';
import {SelectorComponent} from "./SelectorComponent";
import {TimePicker, DatePicker} from 'react-tempusdominus-bootstrap';
import {Button, FloatingLabel, Form, Modal} from "react-bootstrap";
import {
    DESCRIPTION_TEXTAREA_ID, MODAL_CATEGORY_SELECT_ID, MODAL_PRIORITY_LETTER_SELECT_ID,
    MODAL_PRIORITY_DIGIT_SELECT_ID, TO_DO_TASK_STATUS
} from "../../Constants";
import {useAlert} from "react-alert";
import {postReq} from "../../services/RequestService";

/**
 * Кнопка с открытием модального окна добавления задачи
 *
 * @param refreshTaskList функция обновления списка задач
 * @param showModalCall хук показа окна
 * @param categories список категорий
 * @param taks задача
 * @returns {*} кнопку с модальным окном
 * @constructor
 */
export const TaskModal = ({refreshTaskList, showModalCall, categories, task}) => {

    const noCategories = Object.keys(categories).length === 0;

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
        let category = document.getElementById(MODAL_CATEGORY_SELECT_ID).selectedOptions[0].value;
        let priorityLetter = document.getElementById(MODAL_PRIORITY_LETTER_SELECT_ID).selectedOptions[0].value;
        let priorityDigit = document.getElementById(MODAL_PRIORITY_DIGIT_SELECT_ID).selectedOptions[0].value;

        let body = {
            id: id,
            description: description,
            priority: priorityLetter + priorityDigit,
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

    const impossibleToCreateTaskAlert = (
        <div className="danger-alert">
            Невозможно создать задачу без раздела
        </div>
    );

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{task ? "Редактировать задачу" : "Новая задача"}</Modal.Title>
                </Modal.Header>

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
                        {/* Селектор раздела */}
                        <div className="modal-selector-block">
                            <div className="modal-selector-header">Раздел:</div>
                            <div className="modal-selector-wrapper">
                                <SelectorComponent
                                    id={MODAL_CATEGORY_SELECT_ID}
                                    defaultValue={task ? task.category : undefined}
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
                                    defaultValue={task ? task.priority[0] : undefined}
                                    optionMap={{
                                        "A" : "A",
                                        "B" : "B",
                                        "C" : "C",
                                        "D" : "D"}}
                                    notifySelection={() => {}}/>
                                <SelectorComponent
                                    id={MODAL_PRIORITY_DIGIT_SELECT_ID}
                                    defaultValue={task ? task.priority[1] : undefined}
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
                            <DatePicker format={"DD.MM.YYYY"}
                                        date={date}
                                        // icons={type: "feather"}
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

                    {noCategories ? impossibleToCreateTaskAlert : ""}
                </div>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary"
                            onClick={() => handleSave()}
                            disabled={noCategories}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
