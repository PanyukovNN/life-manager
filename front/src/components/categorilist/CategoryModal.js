import '../../App.css';
import {React, useEffect, useState} from 'react';
import {Button, FloatingLabel, Form, Modal} from "react-bootstrap";
import {NAME_TEXTAREA_ID} from "../../Constants";

export const CategoryModal = ({refreshCategoryList, showModalCall, category}) => {

    const [show, setShow] = useState(false);

    const handleClose = async () => setShow(false);

    useEffect(
        () => {
            // Прерываем запуск useEffect при рендере
            if (showModalCall === 0) {
                return;
            }

            setShow(true);
        },
        [showModalCall]
    );

    // Нажатие на кнопку добавления задачи
    const handleSave = async () => {
        let id = category ? category.id : null;
        let name = document.getElementById(NAME_TEXTAREA_ID).value;

        if (name === null || name === "") {
            return;
        }

        let body = {
            id: id,
            name: name
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };

        const response = await fetch('http://localhost:80/api/category/create-update', requestOptions);
        // Возвращает категорию
        await response.json();

        refreshCategoryList();
        setShow(false);
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{category ? "Редактировать категорию" : "Новая категория"}</Modal.Title>
                </Modal.Header>

                <div className="add-task-inputs-wrap">
                    {/* Поле ввода наименования категории */}
                    <div className="task-textarea-wrap">
                        <FloatingLabel id="taskTextarea" controlId="floatingTextarea2" label="Нименование категории">
                            <Form.Control
                                id={NAME_TEXTAREA_ID}
                                as="textarea"
                                placeholder=""
                                defaultValue={category ? category.name : ""}
                                style={{ height: '100px' }}
                            />
                        </FloatingLabel>
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
