import '../App.css';
import {React} from 'react'
import {LoginRegistrationForm} from "../components/LoginRegistrationForm";

/**
 * Страница входа/регистрации пользователя
 *
 * @returns {*} страница входа/регистрации пользователя
 * @constructor
 */
export const LoginRegistrationPage = ({isRegistration}) => {


    return (
        <div className="login-registration-form-wrap">
            <LoginRegistrationForm isRegistration={isRegistration}/>
        </div>
    );
}
