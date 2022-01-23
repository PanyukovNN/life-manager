import axios from "axios";
import {getAccessToken} from "./AuthService";
import {showAlert} from "./AlertService";

export function postReq(url, body) {
    let postResponse = axios.post(url,
        JSON.stringify(body),
        {
            headers : {'Authorization': getAccessToken(), 'Content-Type': 'application/json'}
        });

    return processResponse(postResponse);
}

export function getReq(url) {
    let getResponse = axios.get(url,
        {
            headers : {'Authorization': getAccessToken(), 'Content-Type': 'application/json'}
        });

    return processResponse(getResponse);
}

export function deleteReq(url, body) {
    let deleteResponse = axios.delete(url,{
        data: JSON.stringify(body),
        headers : {'Authorization': getAccessToken(), 'Content-Type': 'application/json'}
    });

    return processResponse(deleteResponse);
}

const processResponse = (axiosResponse) => {
    return axiosResponse
        .then((response) => {
            if (response.status !== 200) {
                throw response;
            }

            return response;
        })
        .catch((error) => {
            if (error.response && error.response.data && error.response.message) {
                showAlert(error.response.data.message);
            } else {
                if (error.message && error.message === "Network Error") {
                    showAlert("Отсутствует соединение с сервером");

                    return;
                }

                if (!error.response.status) {
                    showAlert("Отсутствует соединение с сервером");

                    return;
                }

                console.log(error.response)

                if (error.response.status === 500) {

                }

                showAlert(error.response.data);
            }
        });
}
