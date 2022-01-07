package org.panyukovnn.lifemanager.exception;

import lombok.NoArgsConstructor;
import org.panyukovnn.lifemanager.service.LifeManagerUserDetailService;

/**
 * Исключение в сервисе {@link LifeManagerUserDetailService}
 */
@NoArgsConstructor
public class AuthUserDetailServiceException extends LifeManagerException {

    /**
     * Конструктор
     * @param message сообщение
     */
    public AuthUserDetailServiceException(String message) {
        super(message);
    }

    /**
     * Конструктор
     * @param message сообщение
     * @param e исключение
     */
    public AuthUserDetailServiceException(String message, Exception e) {
        super(message, e);
    }
}
