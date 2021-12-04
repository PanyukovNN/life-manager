package org.panyukovnn.lifemanager.service;

import io.micrometer.core.instrument.util.StringUtils;

import java.time.format.DateTimeFormatter;

import static org.panyukovnn.lifemanager.model.Constants.WRONG_PRIORITY_INT_VALUE_ERROR_MSG;
import static org.panyukovnn.lifemanager.model.Constants.WRONG_PRIORITY_STRING_VALUE_ERROR_MSG;

/**
 * Вспомогательные методы для контроллеров
 */
public class ControllerHelper {

    public static final DateTimeFormatter FRONT_D_FORMATTER = DateTimeFormatter.ofPattern("dd:MM:yyyy");
    public static final DateTimeFormatter FRONT_T_FORMATTER = DateTimeFormatter.ofPattern("HH:mm");

    /**
     * Конвертировать строчную запись приоритета в числовое значение
     * Первый символ от A до D, второй символ число от 1 до 4
     * Например строке А1 соответствует приоритет 15
     * B1 -> 11
     * C1 -> 7
     * D1 -> 3
     * D4 -> 0
     *
     * @param priorityParam строчная запись приоритета
     * @return числовое значение приоритета
     */
    public static int paramToPriority(String priorityParam) {
        if (StringUtils.isBlank(priorityParam) || priorityParam.length() != 2) {
            throw new IllegalArgumentException(WRONG_PRIORITY_STRING_VALUE_ERROR_MSG);
        }

        char letter = priorityParam.charAt(0);
        int digit = Character.getNumericValue(priorityParam.charAt(1));

        if (letter < 'A' || letter > 'D'
                || digit < 1 || digit > 4) {
            throw new IllegalArgumentException(WRONG_PRIORITY_STRING_VALUE_ERROR_MSG);
        }

        // Возвращает максимальное число диапазона по букве (Например, если А то 4, если D то 0)
        int multiplier = 4 * (4 - letter + 'A');

        // Уменьшаем максимальное число диапазона на число (Например, если А2 то 14, если C4 то 4)
        return multiplier - digit;
    }

    /**
     * Конвертировать числовой приоритет в строчную запись
     *
     * @param priority приоритет в числовом виде
     * @return строчная запись приоритета
     */
    public static String priorityToParam(int priority) {
        if (priority < 0 || priority > 15) {
            throw new IllegalArgumentException(WRONG_PRIORITY_INT_VALUE_ERROR_MSG);
        }

        int digit = (priority + 1) % 4;
        char letter = (char) ('A' + 4 - (priority / 4));

        return letter + digit + "";
    }
}
