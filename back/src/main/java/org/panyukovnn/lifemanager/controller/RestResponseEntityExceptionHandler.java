package org.panyukovnn.lifemanager.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.HashMap;
import java.util.Map;

import static org.panyukovnn.lifemanager.model.Constants.ERROR_OCCURRED_MSG;

/**
 * Адвайс для обработки исключений контроллеров
 */
@ControllerAdvice
public class RestResponseEntityExceptionHandler {

    /**
     * Обработать исключение
     *
     * @param e исключение
     * @return тело ответа о возникшем исключении
     */
    @ExceptionHandler(value = {Exception.class})
    protected ResponseEntity<Object> handleConflict(Exception e) {
        e.printStackTrace();

        return ResponseEntity.internalServerError().body(ERROR_OCCURRED_MSG + e.getMessage());
    }

    @ExceptionHandler(value = {MethodArgumentNotValidException.class})
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException e) {
        e.printStackTrace();

        Map<String, String> errors = new HashMap<>();
        e.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        return ResponseEntity.badRequest().body(errors);
    }
}
