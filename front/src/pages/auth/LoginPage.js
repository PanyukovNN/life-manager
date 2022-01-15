import '../../App.css';
import React from "react";
import {SignForm} from "../../components/SignForm";

/**
 * Страница входа пользователя
 *
 * @returns страница входа
 */
export const LoginPage = () => {

    return (
        <SignForm isRegistration={false}/>
    );
}
