import '../../App.css';
import React from "react";
import {SignForm} from "../../components/SignForm";

/**
 * Страница входа пользователя
 *
 * @returns {*} страница входа
 * @constructor
 */
export const LoginPage = () => {

    return (
        <div className="sign-form-wrap">
            <SignForm isRegistration={false}/>
        </div>
    );
}
