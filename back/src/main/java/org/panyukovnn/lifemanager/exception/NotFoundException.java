package org.panyukovnn.lifemanager.exception;

import lombok.NoArgsConstructor;

/**
 * Исключение при не обнаружении сущности.
 */
@NoArgsConstructor
public class NotFoundException extends LifeManagerException {

    /**
     * Конструктор.
     * @param message сообщение
     */
    public NotFoundException(String message) {
        super(message);
    }

    /**
     * Конструктор.
     * @param message сообщение
     * @param e исключение
     */
    public NotFoundException(String message, Exception e) {
        super(message, e);
    }
}
