package org.panyukovnn.lifemanager.model.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

import static org.panyukovnn.lifemanager.model.Constants.BLANK_PASSWORD_ERROR_MSG;
import static org.panyukovnn.lifemanager.model.Constants.BLANK_USER_NAME_ERROR_MSG;

/**
 * Запрос аутентификации пользователя.
 */
@Getter
@Setter
public class AuthRequest {

	@NotBlank(message = BLANK_USER_NAME_ERROR_MSG)
	private String username;

	@NotBlank(message = BLANK_PASSWORD_ERROR_MSG)
	private String password;
}
