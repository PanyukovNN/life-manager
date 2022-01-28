import '../../App.css';
import {React, useEffect, useState} from 'react';
import {Button, FloatingLabel, Form, Modal} from "react-bootstrap";
import {NAME_TEXTAREA_ID} from "../../Constants";
import {createUpdateCategory} from "../../services/CategoryService";

/**
 * Модальное окно создания/обновления категории
 *
 * @param refreshCategoryList функция обновления списка категорий
 * @param showModalCall хук показа модального окна
 * @param category категория
 * @returns модальное окно
 */
export const CategoryModal = ({refreshCategoryList, showModalCall, category}) => {

    const [showSpinner, setShowSpinner] = useState(false);
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
        setShowSpinner(true);

        let id = category ? category.id : null;
        let name = document.getElementById(NAME_TEXTAREA_ID).value;

        createUpdateCategory(id, name)
            .then(() => {
                refreshCategoryList();
                setShow(false);

                setShowSpinner(false);
            });
    }

    return (
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
                <Button variant="primary" onClick={handleSave}>
                    {showSpinner && <span className="spinner-border spinner-border-sm mr-3"> </span>}
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
