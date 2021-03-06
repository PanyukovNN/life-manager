import '../../App.css';
import {React, useEffect, useState} from 'react';
import {DatePicker, TimePicker} from 'react-tempusdominus-bootstrap';
import {Button, FloatingLabel, Form, Modal} from "react-bootstrap";
import {DESCRIPTION_TEXTAREA_ID, PRIORITY_2_DEFINITION} from "../../Constants";
import {getCurrentCategory} from "../../services/CategoryService";
import {createUpdateTask} from "../../services/TaskService";

/**
 * Модальное окно создания/удаления задачи
 *
 * @param refreshTaskList функция обновления списка задач
 * @param showModalCall хук показа окна
 * @param task задача
 * @param priority приоритет
 * @returns кнопку с модальным окном
 */
export const TaskModal = ({refreshTaskList,
                              showModalCall,
                              task,
                              priority}) => {

    const [show, setShow] = useState(false);
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [showSpinner, setShowSpinner] = useState(false);
    const [categoryName, setCategoryName] = useState("");

    useEffect(
        () => {
            // Прерываем запуск useEffect при рендере
            if (showModalCall === 0) {
                return;
            }

            setCategoryName(getCurrentCategory());
            setDate(task !== null ? task.plannedDate : "")
            setTime(task !== null ? task.plannedTime : "")

            setShow(true);
        },
        [showModalCall]
    );

    const handleClose = () => setShow(false);

    const handleShow = () => {
        // При открытии модального окна устанавливаем фокус на поле воода описания задачи
        let descriptionTextarea = document.getElementById(DESCRIPTION_TEXTAREA_ID);
        let descriptionLength = descriptionTextarea.value.length;
        descriptionTextarea.focus();
        descriptionTextarea.setSelectionRange(descriptionLength, descriptionLength);
    }

    const handleSave = async () => {
        setShowSpinner(true);

        let id = task ? task.id : null;
        let description = document.getElementById(DESCRIPTION_TEXTAREA_ID).value;

        createUpdateTask(id, description, priority, categoryName, date, time)
            .then((response) => {
                setShow(false);
                refreshTaskList();

                setShowSpinner(false);
            })
    }

    return (
        <Modal show={show} onShow={handleShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {task
                        ? "Редактировать задачу"
                        : "Новая задача"}
                </Modal.Title>
            </Modal.Header>

            <div className="task-modal-priority-wrap">
                Раздел: {categoryName}
                <br/>
                Приоритет: {PRIORITY_2_DEFINITION[priority]}
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
                    {showSpinner && <span className="spinner-border spinner-border-sm mr-3"> </span>}
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
