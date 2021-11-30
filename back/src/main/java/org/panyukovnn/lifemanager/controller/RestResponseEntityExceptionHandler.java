package org.panyukovnn.lifemanager.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import static org.panyukovnn.lifemanager.model.Constants.ERROR_OCCURRED_MSG;

/**
 * Адвайс для обработки исключений контроллеров
 */
@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    /**
     * Обработать исключение
     * @param e исключение
     * @return тело ответа о возникшем исключении
     */
    @ExceptionHandler(value = { Exception.class })
    protected ResponseEntity<Object> handleConflict(Exception e) {
        e.printStackTrace();

        return ResponseEntity.internalServerError().body(ERROR_OCCURRED_MSG + e.getMessage());
    }
}
