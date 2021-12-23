package org.panyukovnn.lifemanager.model.validator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

/**
 * Аннотация валидации пароля
 */
@Documented
@Retention(RUNTIME)
@Target({ TYPE, FIELD, PARAMETER, ANNOTATION_TYPE })
@Constraint(validatedBy = PasswordConstraintValidator.class)
public @interface ValidPassword {

	String message() default "Неверный пароль.";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};
}
