import axios from "axios";
import getAccessToken from "./AuthHeader";

const API_URL = "http://localhost/api/auth/";

/**
 * Запрос на регистрацию пользователя
 *
 * @param username имя пользователя
 * @param email почтовый ящик
 * @param password пароль
 * @param comfirmPassword подтверждение пароля
 * @returns ответ на запрос
 */
const signUp = (username, email, password, comfirmPassword) => {
    return axios.post(API_URL + "sign-up", {
        username,
        email,
        password,
        comfirmPassword
    });
};

/**
 * Запрос на аутентификаци
 *
 * @param username имя пользователя
 * @param password пароль
 * @returns ответ на запрос
 */
const signIn = (username, password) => {
    return axios
        .post(API_URL + "sign-in", {
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
const signOut = () => {
    localStorage.removeItem("user");
    window.location.href = "/sign-in";
};

/**
 * Аутентифицирован ли пользователь
 *
 * @returns {boolean} аутентифицирован ли пользователь
 */
const isLoggedIn = () => {
    return getAccessToken() !== null;
}

export default {
    signUp,
    signIn,
    signOut,
    isLoggedIn
};
