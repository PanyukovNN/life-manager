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
    return axios.post(AUTH_URL + "sign-up", {
        username,
        email,
        password,
        confirmPassword
    });
};

/**
 * Запрос на аутентификаци
 *
 * @param username имя пользователя
 * @param password пароль
 * @returns результат выполнения запроса
 */
export function signIn(username, password) {
    return axios
        .post(AUTH_URL + "sign-in", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

/**
 * Выход пользователя
 */
export function signOut() {
    localStorage.removeItem("user");
    window.location.href = "/sign-in";
};

/**
 * Аутентифицирован ли пользователь
 *
 * @returns {boolean} аутентифицирован ли пользователь
 */
export function isLoggedIn() {
    return getAccessToken() !== null;
}

/**
 * Взять токен доступа из локального хранилища
 *
 * @returns {boolean} аутентифицирован ли пользователь
 */
export function getAccessToken() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        return 'Bearer ' + user.accessToken;
    } else {
        return null;
    }
}
