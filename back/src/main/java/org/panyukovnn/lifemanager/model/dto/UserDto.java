package org.panyukovnn.lifemanager.model.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

/**
 * Транспортный объект пользователя.
 */
@Getter
@Builder
public class UserDto {

    private final String username;
    private final String email;
    private final String creationDate;
    private final List<String> roles;
}
