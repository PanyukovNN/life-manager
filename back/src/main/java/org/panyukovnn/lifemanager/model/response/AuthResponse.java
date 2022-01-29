package org.panyukovnn.lifemanager.model.response;

import lombok.Builder;
import lombok.Getter;
import org.panyukovnn.lifemanager.model.dto.UserDto;

/**
 * Ответ на аутентификацию пользователя.
 */
@Getter
@Builder
public class AuthResponse {

    private final UserDto userDto;

    /**
     * Токен доступа в формате JWT.
     */
    private final String accessToken;
}
