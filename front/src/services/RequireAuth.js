import React from 'react'
import {isLoggedIn} from './AuthService'
import {Navigate} from "react-router";

/**
 * Обертка для компонентов, требующих аутентификации пользователя
 *
 * @param children дочерний компонент
 * @returns обертка аутентификации
 */
export const RequireAuth = ({ children }) => {
    return isLoggedIn()
        ? children
        : <Navigate to="/sign-in"/>;
};

export default RequireAuth
