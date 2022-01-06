package org.panyukovnn.lifemanager.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Ответ на аутентификацию пользователя
 */
@Getter
@AllArgsConstructor
public class AuthResponse {

	/**
	 * Индивидуальный jwt токен
	 */
	private String token;
}
