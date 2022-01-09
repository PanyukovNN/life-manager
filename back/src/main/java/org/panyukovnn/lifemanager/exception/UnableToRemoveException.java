package org.panyukovnn.lifemanager.exception;

import lombok.NoArgsConstructor;

/**
 * Исключение при невозможности удалить сущность.
 */
@NoArgsConstructor
public class UnableToRemoveException extends LifeManagerException {

    /**
     * Конструктор.
     * @param message сообщение
     */
    public UnableToRemoveException(String message) {
        super(message);
    }

    /**
     * Конструктор.
     * @param message сообщение
     * @param e исключение
     */
    public UnableToRemoveException(String message, Exception e) {
        super(message, e);
    }
}
