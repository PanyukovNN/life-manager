import React from 'react'
import {isLoggedIn} from './AuthService'

/**
 * Обертка для компонентов, требующих переадресации на главную страницу если пользователь уже аутентифицирован
 *
 * @param children дочерний компонент
 * @returns обертка аутентификации
 */
export const RedirectAfterAuth = ({ children }) => {

    const navigateToMainPage = () => {
        window.location.href = "/";
    }

    return isLoggedIn()
        ? navigateToMainPage()
        : children;
};

export default RedirectAfterAuth
