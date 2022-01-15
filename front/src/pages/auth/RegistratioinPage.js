import '../../App.css';
import React from "react";
import {SignForm} from "../../components/SignForm";

/**
 * Страница регистрации нового пользователя
 *
 * @returns страница регистрации
 */
export const RegistrationPage = () => {

    return (
        <SignForm isRegistration={true}/>
    );
}
