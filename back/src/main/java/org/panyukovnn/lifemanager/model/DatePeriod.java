package org.panyukovnn.lifemanager.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * Вспомогательный объект периода.
 */
@Data
@NoArgsConstructor
public class DatePeriod {

    /**
     * Дата начала.
     */
    private LocalDate start;

    /**
     * Дата окончания.
     */
    private LocalDate end;
}
