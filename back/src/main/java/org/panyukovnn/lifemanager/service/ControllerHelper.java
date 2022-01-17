package org.panyukovnn.lifemanager.service;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;

/**
 * Вспомогательные методы для контроллеров.
 */
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ControllerHelper {

    public static final DateTimeFormatter FRONT_D_FORMATTER = DateTimeFormatter.ofPattern("dd.MM.yyyy");
    public static final DateTimeFormatter FRONT_T_FORMATTER = DateTimeFormatter.ofPattern("HH:mm");
}
