import '../App.css';
import {React} from 'react';
import {Button, Form} from "react-bootstrap";

/**
 * Форма логиа/регистрации
 *
 * @param isRegistration флаг регистрации (если false - логин, если true - регистрации)
 * @returns {*} форма логина/регистрации
 * @constructor
 */
export const LoginRegistrationForm = ({isRegistration}) => {

    // const nameInput = (
    //     <div className="mt-3">
    //         <div className="">
    //             <input type="text" className="form-control feedback-valid registration-form-input" id="name" name="name"
    //                    placeholder="Имя" value={user ? user.name : ""}/>
    //             <div className="invalid-feedback" id="nameError"></div>
    //         </div>
    //     </div>
    // );

    return (
        <Form className="login-form">

            <div className="d-flex justify-content-center login-registration-form-header-wrap">
                <h3>{isRegistration ? "Регистрация" : "Вход"}</h3>
            </div>

            {/*Поле ввода имени*/}
            {/*{isRegistration ? nameInput : ""}*/}

            {/*/!*Поле ввода email*!/*/}
            {/*<div class="mt-3">*/}
            {/*    <div class="">*/}
            {/*        <input type="email" class="form-control feedback-valid registration-form-input" id="username" name="username" placeholder="Email" th:value="${user} ? ${user.username}"/>*/}
            {/*        <div class="invalid-feedback" id="usernameError"></div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*/!*Поле ввода пароля*!/*/}
            {/*<div class="mt-3">*/}
            {/*    <div class="">*/}
            {/*        <input type="password" class="form-control feedback-valid registration-form-input" id="password" name="password" placeholder="Пароль"/>*/}
            {/*        <div class="invalid-feedback" id="passwordError"></div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*/!*Поле ввода подтверждения пароля*!/*/}
            {/*<div class="form-group mt-2" th:if="${isRegistration}">*/}
            {/*    <div class="">*/}
            {/*        <input type="password" class="form-control feedback-valid registration-form-input" id="passwordConfirmation" name="passwordConfirmation" placeholder="Подтверждение пароля"/>*/}
            {/*        <div class="invalid-feedback" id="passwordConfirmationError"></div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*<div class="d-flex justify-content-center mt-5">*/}
            {/*    <button type="button" class="btn btn-outline-primary submit-btn" style="width: 10rem"*/}
            {/*            th:text="${registration} ? 'Подтвердить' : 'Войти'"></button>*/}
            {/*</div>*/}

            {/*<input type="hidden" name="_csrf" th:value="${_csrf.token}"/>*/}
            {/*<input type="hidden" name="remember-me" value="true"/>*/}

            {/*<div class="text-center" style="margin-top: 1.5rem">*/}
            {/*    <a th:href="${registration} ? '/user/login' : '/user/registration'" class="link-hover text__light-color"*/}
            {/*       th:text="${registration} ? 'Уже зарегистрированы?' : 'Ещё не зарегистрированы?'">*/}
            {/*    </a>*/}
            {/*</div>*/}
        </Form>
    )
}
