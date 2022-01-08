package org.panyukovnn.lifemanager.model.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * Ответ на аутентификацию пользователя
 */
@Getter
@RequiredArgsConstructor
public class AuthResponse {

	/**
	 * JWT токен доступа
	 */
	private final String accessToken;
}
