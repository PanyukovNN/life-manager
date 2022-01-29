import '../App.css';
import React, {useEffect, useState} from "react";
import {getUser} from "../services/AuthService";

/**
 * Страница профиля.
 *
 * @returns страница профиля
 */
export const ProfilePage = () => {

    const [user, setUser] = useState(null);
    useEffect(() => setUser(getUser()), [])

    return (
        <div className="profile-page-wrap">
            <div>
                Логин: {user && user.username}
            </div>
            <div>
                Email: {user && user.email}
            </div>
            <div>
                Дата регистрации: {user && user.creationDate}
            </div>
            <div>
                Права доступа: {user && user.roles}
            </div>
        </div>
    );
}
