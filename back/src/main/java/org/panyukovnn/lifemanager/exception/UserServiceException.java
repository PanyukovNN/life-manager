package org.panyukovnn.lifemanager.exception;

import lombok.NoArgsConstructor;

/**
 * Исключение при не активном аккаунте пользователя
 */
@NoArgsConstructor
public class UserServiceException extends LifeManagerException {

    /**
     * Конструктор
     * @param message сообщение
     */
    public UserServiceException(String message) {
        super(message);
    }

    /**
     * Конструктор
     * @param message сообщение
     * @param e исключение
     */
    public UserServiceException(String message, Exception e) {
        super(message, e);
    }
}
