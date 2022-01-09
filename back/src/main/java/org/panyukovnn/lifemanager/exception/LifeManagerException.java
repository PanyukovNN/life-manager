package org.panyukovnn.lifemanager.exception;

import lombok.NoArgsConstructor;

/**
 * Исключение приложения.
 */
@NoArgsConstructor
public class LifeManagerException extends RuntimeException {

    /**
     * Конструктор.
     *
     * @param message сообщение
     */
    public LifeManagerException(String message) {
        super(message);
    }

    /**
     * Конструктор.
     * @param message сообщение
     * @param e исключение
     */
    public LifeManagerException(String message, Exception e) {
        super(message, e);
    }
}
