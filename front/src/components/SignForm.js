import '../App.css';
import {React, useState} from 'react';
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";
import profileIcon from "../resources/icon/profile.png";
import loginLabelIcon from "../resources/icon/login-label-icon.png";
import {signUp, signIn} from "../services/AuthService";
import {showAlert} from "../services/AlertService";

/**
 * Форма логиа/регистрации
 *
 * @param isRegistration флаг регистрации (если false - логин, если true - регистрация)
 * @returns форма логина/регистрации
 */
export const SignForm = ({isRegistration} ) => {

    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({});
    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);

        const processSuccessSubmit = () => {
            window.location.href = "/";
        }

        const processErrorSubmit = (error) => {
            setLoading(false);

            if (error && error.response && error.response.status === 400) {
                setErrors(error.response.data);
            } else {
                showAlert(error.response.data);
            }
        }

        if (isRegistration) {
            signUp(form.username, form.email, form.password, form.confirmPassword)
                .then(
                    processSuccessSubmit,
                    processErrorSubmit
                );
        } else {
            signIn(form.email, form.password)
                .then(
                    processSuccessSubmit,
                    processErrorSubmit
                );
        }
    };

    const usernameInput = (
        <InputGroup className="mb-3">
            <InputGroup.Text className="sign-from-fa-input-icon-wrap">
                <img className="sign-form-login-label-icon" src={loginLabelIcon} alt="Login icon"/>
            </InputGroup.Text>
            <FormControl
                placeholder="Имя пользователя"
                aria-label="Имя пользователя"
                name="username"
                onChange={ e => setField('username', e.target.value) }
                isInvalid={ !!errors.username }
            />
            <Form.Control.Feedback type='invalid'>
                { errors.username }
            </Form.Control.Feedback>
        </InputGroup>
    );

    const emailInput = (
        <InputGroup className="mb-3">
            <InputGroup.Text>@</InputGroup.Text>
            <FormControl
                placeholder="Email"
                aria-label="Email"
                name="email"
                onChange={ e => setField('email', e.target.value) }
                isInvalid={ !!errors.email }
            />
            <Form.Control.Feedback type='invalid'>
                { errors.email }
            </Form.Control.Feedback>
        </InputGroup>
    )

    const passwordInput = (
        <InputGroup className="mt-3">
            <InputGroup.Text className={"sign-from-fa-input-icon-wrap"}>
                <i className="fa fa-lock sign-from-fa-lock-icon" aria-hidden="true"> </i>
            </InputGroup.Text>
            <FormControl
                type="password"
                placeholder="Пароль"
                aria-label="Пароль"
                name="password"
                onChange={ e => setField('password', e.target.value) }
                isInvalid={ !!errors.password }
            />
            <Form.Control.Feedback type='invalid'>
                { errors.password }
            </Form.Control.Feedback>
        </InputGroup>
    )

    const confirmPasswordInput = (
        <InputGroup className="mt-3">
            <InputGroup.Text className={"sign-from-fa-input-icon-wrap"}>
                <i className="fa fa-lock sign-from-fa-lock-icon" aria-hidden="true"> </i>
            </InputGroup.Text>
            <FormControl
                type="password"
                placeholder="Подтверждение пароля"
                aria-label="Подтверждение пароля"
                name="confirmPassword"
                onChange={ e => setField('confirmPassword', e.target.value) }
                isInvalid={ !!errors.confirmPassword }
            />
            <Form.Control.Feedback type='invalid'>
                { errors.confirmPassword }
            </Form.Control.Feedback>
        </InputGroup>
    )

    return (
        <div className="sign-form-wrap">
            <Form>
                <img className="sign-form-profile-icon" src={profileIcon} alt="Profile icon"/>

                <div className="text-center sign-form-header-wrap">
                    <h5>Введите свои данные</h5>
                </div>

                {isRegistration && usernameInput}

                {emailInput}

                {passwordInput}

                {isRegistration && confirmPasswordInput}

                <Button variant="outline-primary w-100 mt-5 mb-3"
                        type="submit"
                        onClick={handleSubmit}>
                    {loading && <span className="spinner-border spinner-border-sm mr-2"> </span>}
                    {isRegistration
                        ? <span>Зарегистрироваться</span>
                        : <span>Войти на сайт</span>}
                </Button>

                {isRegistration
                    ? <a href="/sign-in">Уже зарегистрированы?</a>
                    : <a href="/sign-up">Ещё не зарегистрированы?</a>}
            </Form>
        </div>
    )
}
