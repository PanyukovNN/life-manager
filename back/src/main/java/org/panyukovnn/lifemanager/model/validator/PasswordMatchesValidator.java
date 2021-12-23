package org.panyukovnn.lifemanager.model.validator;

import org.panyukovnn.lifemanager.model.user.User;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Objects;

/**
 * Валидатор совпадения пароля и пароля подтверждения
 */
public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, Object> {

    private String message;

    @Override
    public void initialize(PasswordMatches passwordMatches) {
        this.message = passwordMatches.message();
    }

    @Override
    public boolean isValid(Object obj, ConstraintValidatorContext context) {
        User user = (User) obj;

        boolean passwordsEquals = Objects.equals(user.getPassword(), user.getConfirmPassword());

        if (!passwordsEquals) {
            context
                    .buildConstraintViolationWithTemplate(message)
                    .addPropertyNode("matchingPassword")
                    .addConstraintViolation()
                    .disableDefaultConstraintViolation();
        }

        return passwordsEquals;
    }
}
