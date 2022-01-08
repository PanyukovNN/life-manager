import '../App.css';
import {React, useState} from 'react';
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";
import profileIcon from "../resources/icon/profile.png";

/**
 * Форма логиа/регистрации
 *
 * @param isRegistration флаг регистрации (если false - логин, если true - регистрации)
 * @param handleSubmit функця нажатия на кнопку отправки формы
 * @param loading флаг загрузки
 * @returns {*} форма логина/регистрации
 * @constructor
 */
export const LoginRegistrationForm = ({isRegistration, handleSubmit1, loading, errors}) => {

    // const [errors, setErrors] = useState({})


    const [form, setForm] = useState({});
    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
    }

    return (
        <Form>
            <img className="login-form-profile-icon" src={profileIcon}/>

            <div className="text-center login-registration-form-header-wrap">
                <h5>Введите свои данные</h5>
            </div>

            <InputGroup className="mb-3">
                <InputGroup.Text>@</InputGroup.Text>
                <FormControl
                    placeholder="Имя пользователя"
                    aria-label="Имя пользователя"
                    onChange={ e => setField('username', e.target.value) }
                    isInvalid={ !!errors.username }
                />
                <Form.Control.Feedback type='invalid'>
                    { errors.username }
                </Form.Control.Feedback>
            </InputGroup>

            <InputGroup className="mt-3">
                <InputGroup.Text className={"login-registration-from-fa-input-icon-wrap"}>
                    <i className="fa fa-lock login-registration-from-fa-input-icon" aria-hidden="true"></i>
                </InputGroup.Text>
                <FormControl
                    type="password"
                    placeholder="Пароль"
                    aria-label="Пароль"
                    onChange={ e => setField('password', e.target.value) }
                    isInvalid={ !!errors.password }
                />
                <Form.Control.Feedback type='invalid'>
                    { errors.password }
                </Form.Control.Feedback>
            </InputGroup>

            <Button variant="outline-primary w-100 mt-5 mb-3"
                    type="submit"
                    onClick={(e) => handleSubmit1(e, form)}>
                {loading && <span className="spinner-border spinner-border-sm mr-2"></span>}
                <span>Войти на сайт</span>
            </Button>

            <a href="/sign-up">Ещё не зарегистрированы?</a>

            <Form.Control.Feedback type='invalid'>
                { errors.name }
            </Form.Control.Feedback>
        </Form>
    )
}
