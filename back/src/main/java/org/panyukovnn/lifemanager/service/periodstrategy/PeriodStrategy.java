package org.panyukovnn.lifemanager.service.periodstrategy;

import org.panyukovnn.lifemanager.model.PeriodStrategyType;

import java.time.LocalDate;

/**
 * Стратегия для определения периода за который требуется вернуть задачи
 */
public interface PeriodStrategy {

    /**
     * Возвращает дату окончания периода
     */
    LocalDate getEndDate(LocalDate startDate);

    /**
     * Возвращает тип стратегии
     *
     * @return тип стратегии
     */
    PeriodStrategyType getType();
}
