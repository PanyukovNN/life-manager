import React from 'react'
import AuthService from './AuthService'
import { Navigate } from "react-router";

export const RequireAuth = ({ children }) => {
    let auth = AuthService.isLoggedIn();

    return auth ? children : <Navigate to="/sign-in"/>;
};

export default RequireAuth
