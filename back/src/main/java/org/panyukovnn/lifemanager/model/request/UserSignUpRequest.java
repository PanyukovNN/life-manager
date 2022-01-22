package org.panyukovnn.lifemanager.model.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.panyukovnn.lifemanager.model.validator.PasswordMatches;
import org.panyukovnn.lifemanager.model.validator.ValidPassword;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import static org.panyukovnn.lifemanager.model.Constants.*;

/**
 * Запрос на регистрацию пользователя.
 */
@Getter
@Setter
@PasswordMatches
@NoArgsConstructor
public class UserSignUpRequest {

    private Long id;

    @NotBlank(message = BLANK_USER_NAME_ERROR_MSG)
    private String username;

    @Email(message = WRONG_EMAIL_ERROR_MSG)
    @NotBlank(message = BLANK_EMAIL_ERROR_MSG)
    private String email;

    @ValidPassword
    @NotBlank(message = BLANK_PASSWORD_ERROR_MSG)
    private String password;

    /**
     * Подтверждение пароля.
     */
    private String confirmPassword;
}
