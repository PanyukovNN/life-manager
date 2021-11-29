package org.panyukovnn.lifemanager.service;

import io.micrometer.core.instrument.util.StringUtils;
import lombok.experimental.UtilityClass;

import static org.panyukovnn.lifemanager.model.Constants.WRONG_PRIORITY_STRING_VALUE_ERROR_MSG;

/**
 * Вспомогательные методы для контроллеров
 */
@UtilityClass
public class ControllerHelper {

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
    public int convertPriority(String priorityParam) {
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
}
