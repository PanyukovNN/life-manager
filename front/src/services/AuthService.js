import axios from "axios";
import {AUTH_URL} from "../Constants";

/**
 * Запрос на регистрацию пользователя
 *
 * @param username имя пользователя
 * @param email почтовый ящик
 * @param password пароль
 * @param confirmPassword подтверждение пароля
 * @returns результат выполнения запроса
 */
export function signUp(username, email, password, confirmPassword) {
    return axios.post(AUTH_URL + "/sign-up", {
        username,
        email,
        password,
        confirmPassword
    });
}

/**
 * Запрос на аутентификаци
 *
 * @param username имя пользователя
 * @param password пароль
 * @returns результат выполнения запроса
 */
export function signIn(email, password) {
    return axios
        .post(AUTH_URL + "/sign-in", {
            email,
            password,
        })
        .then((response) => {
            if (response.data) {
                localStorage.setItem("user", JSON.stringify(response.data.userDto));
                localStorage.setItem("token", JSON.stringify(response.data.accessToken));
            }

            return response;
        });
}

/**
 * Выход пользователя
 */
export function signOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/sign-in";
}

/**
 * Аутентифицирован ли пользователь
 *
 * @returns {boolean} аутентифицирован ли пользователь
 */
export function isLoggedIn() {
    return getAccessToken() !== null;
}

/**
 * Получить токен доступа из локального хранилища.
 *
 * @returns {boolean} токен доступа
 */
export function getAccessToken() {
    const accessToken = JSON.parse(localStorage.getItem("token"));

    return accessToken
        ? 'Bearer ' + accessToken
        : null;
}

/**
 * Взять данные о пользователе из локально хранилища
 *
 * @returns {boolean} пользователь
 */
export function getUser() {
    return JSON.parse(localStorage.getItem("user"));
}
