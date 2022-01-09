import axios from "axios";

const AUTH_URL = "http://localhost/api/auth/";

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
    return axios.post(AUTH_URL + "sign-up", {
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

/**
 * Взять токен доступа из локального хранилища
 *
 * @returns {boolean} аутентифицирован ли пользователь
 */
const getAccessToken = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        return 'Bearer ' + user.accessToken;
    } else {
        return null;
    }
}

export default {
    signUp,
    signIn,
    signOut,
    isLoggedIn,
    getAccessToken
};
