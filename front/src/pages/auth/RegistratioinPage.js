import '../../App.css';
import React from "react";
import {SignForm} from "../../components/SignForm";

/**
 * Страница регистрации нового пользователя
 *
 * @returns {*} страница регистрации
 * @constructor
 */
export const RegistrationPage = () => {

    return (
        <div className="sign-form-wrap">
            <SignForm isRegistration={true}/>
        </div>
    );
}
