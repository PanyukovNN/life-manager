package org.panyukovnn.lifemanager.model.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import static org.panyukovnn.lifemanager.model.Constants.*;

/**
 * Запрос аутентификации пользователя.
 */
@Getter
@Setter
public class AuthRequest {

	@Email(message = WRONG_EMAIL_ERROR_MSG)
	@NotBlank(message = BLANK_EMAIL_ERROR_MSG)
	private String email;

	@NotBlank(message = BLANK_PASSWORD_ERROR_MSG)
	private String password;
}
