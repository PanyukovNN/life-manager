package org.panyukovnn.lifemanager.model.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * Ответ на аутентификацию пользователя.
 */
@Getter
@RequiredArgsConstructor
public class AuthResponse {

	/**
	 * Токен доступа в формате JWT.
	 */
	private final String accessToken;
}
