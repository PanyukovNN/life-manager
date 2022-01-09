package org.panyukovnn.lifemanager.model.validator;

import org.panyukovnn.lifemanager.model.request.UserSignUpRequest;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Objects;

import static org.panyukovnn.lifemanager.model.Constants.CONFIRM_PASSWORD_KEY;

/**
 * Валидатор совпадения пароля и пароля подтверждения.
 */
public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, UserSignUpRequest> {

    private String message;

    @Override
    public void initialize(PasswordMatches passwordMatches) {
        this.message = passwordMatches.message();
    }

    @Override
    public boolean isValid(UserSignUpRequest request, ConstraintValidatorContext context) {
        boolean passwordsEquals = Objects.equals(request.getPassword(), request.getConfirmPassword());

        if (!passwordsEquals) {
            context
                    .buildConstraintViolationWithTemplate(message)
                    .addPropertyNode(CONFIRM_PASSWORD_KEY)
                    .addConstraintViolation()
                    .disableDefaultConstraintViolation();
        }

        return passwordsEquals;
    }
}
