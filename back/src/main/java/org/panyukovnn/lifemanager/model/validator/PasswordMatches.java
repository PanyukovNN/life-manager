package org.panyukovnn.lifemanager.model.validator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.ElementType.ANNOTATION_TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

/**
 * Аннотация для сравнения пароля с паролем подтверждения
 */
@Documented
@Retention(RUNTIME)
@Target({ TYPE, ANNOTATION_TYPE })
@Constraint(validatedBy = PasswordMatchesValidator.class)
public @interface PasswordMatches {

    String message() default "Пароли не совпадают";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
