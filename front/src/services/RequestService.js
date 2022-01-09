import axios from "axios";
import AuthService from "./AuthService";

export function postReq(url, body, alert) {
    let postResponse = axios.post(url,
        JSON.stringify(body),
        {
            headers : {'Authorization': AuthService.getAccessToken(), 'Content-Type': 'application/json'}
        });

    return processResponse(postResponse, alert);
}

export function getReq(url, alert) {
    let getResponse = axios.get(url,
        {
            headers : {'Authorization': AuthService.getAccessToken(), 'Content-Type': 'application/json'}
        });

    return processResponse(getResponse, alert);
}

export function deleteReq(url, body, alert) {
    let deleteResponse = axios.delete(url,{
        data: JSON.stringify(body),
        headers : {'Authorization': AuthService.getAccessToken(), 'Content-Type': 'application/json'}
    });

    return processResponse(deleteResponse, alert);
}

const processResponse = (axiosResponse, alert) => {
    return axiosResponse
        .then((response) => {
            if (response.status !== 200) {
                throw response;
            }

            return response;
        })
        .catch((error) => {
            if (error.response && error.response.data && error.response.message) {
                alert.show(error.response.data.message);
            } else {
                if (!error.status){
                    alert.show("Сервер не овтечает");

                    return null;
                }

                alert.show(error.message);
            }

            return null;
        });
}
