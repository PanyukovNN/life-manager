import '../App.css';
import React, {useState} from "react";
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";
import AuthService from "../services/AuthService";
import {useAlert} from "react-alert";
import profileIcon from "../resources/icon/profile.png";
import {LoginRegistrationForm} from "../components/LoginRegistrationForm";

export const LoginPage = () => {

    const alert = useAlert();

    const [errors, setErrors] = useState({})
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit1 = (e, form) => {
        e.preventDefault();

        setLoading(true);

        AuthService.login(form.username, form.password).then(
            () => {
                window.location.href = "/";
            },
            (error) => {
                setLoading(false);

                if (error.response.status === 400) {
                    setErrors(error.response.data);
                } else {
                    alert.show(error.response.data);
                }
            }
        );
    };

    return (
        <div className="login-registration-form-wrap">
            <LoginRegistrationForm
                isRegistration={false}
                handleSubmit1={handleSubmit1}
                loading={loading}
                errors={errors}
            />
        </div>
    );
}
