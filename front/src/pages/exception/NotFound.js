import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Страница с отображением ошибки 404
 *
 * @returns {*} страница 404
 * @constructor
 */
export const NotFound = () => {
    return (
        <div>
            <h1>404 - Not Found!</h1>
            <Link to="/">Go Home</Link>
        </div>
    );
}
