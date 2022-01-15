import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Страница с отображением ошибки 404
 *
 * @returns страница 404
 */
export const NotFoundPage = () => {
    return (
        <div className="not-found-page-wrap">
            <div className="not-found-page-text-wrap">
                <h1>404</h1>
                <h2>Страница не найдена</h2>
                <Link className="not-found-back-to-home-link" to="/">на главную</Link>
            </div>
        </div>
    );
}
