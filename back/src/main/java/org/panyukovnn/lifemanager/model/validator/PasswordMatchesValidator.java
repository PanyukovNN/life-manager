package org.panyukovnn.lifemanager.model.validator;

import org.panyukovnn.lifemanager.model.user.User;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Objects;

import static org.panyukovnn.lifemanager.model.Constants.PASSWORD_KEY;

/**
 * Валидатор совпадения пароля и пароля подтверждения
 */
public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, User> {

    private String message;

    @Override
    public void initialize(PasswordMatches passwordMatches) {
        this.message = passwordMatches.message();
    }

    @Override
    public boolean isValid(User user, ConstraintValidatorContext context) {
        boolean passwordsEquals = Objects.equals(user.getPassword(), user.getConfirmPassword());

        if (!passwordsEquals) {
            context
                    .buildConstraintViolationWithTemplate(message)
                    .addPropertyNode(PASSWORD_KEY)
                    .addConstraintViolation()
                    .disableDefaultConstraintViolation();
        }

        return passwordsEquals;
    }
}
