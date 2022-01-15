import axios from "axios";
import AuthService from "./AuthService";
import {showAlert} from "./AlertService";

export function postReq(url, body) {
    let postResponse = axios.post(url,
        JSON.stringify(body),
        {
            headers : {'Authorization': AuthService.getAccessToken(), 'Content-Type': 'application/json'}
        });

    return processResponse(postResponse);
}

export function getReq(url) {
    let getResponse = axios.get(url,
        {
            headers : {'Authorization': AuthService.getAccessToken(), 'Content-Type': 'application/json'}
        });

    return processResponse(getResponse);
}

export function deleteReq(url, body) {
    let deleteResponse = axios.delete(url,{
        data: JSON.stringify(body),
        headers : {'Authorization': AuthService.getAccessToken(), 'Content-Type': 'application/json'}
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
                if (!error.status) {
                    showAlert("Отсутствует соединение с сервером");

                    return null;
                }

                showAlert(error.message);
            }

            return null;
        });
}
