import React from 'react'
import {isLoggedIn} from './AuthService'
import {Navigate} from "react-router";
import { useNavigate } from "react-router-dom";

/**
 * Обертка для компонентов, требующих аутентификации пользователя
 *
 * @param children дочерний компонент
 * @returns обертка аутентификации
 */
export const RequireAuth = ({ children }) => {

    const navigateToSignIn = () => {
        window.location.href = "/sign-in";
    }

    return isLoggedIn()
        ? children
        : navigateToSignIn();
};

export default RequireAuth
