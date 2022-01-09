package org.panyukovnn.lifemanager.service.periodstrategy;

import org.panyukovnn.lifemanager.model.PeriodStrategyType;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

/**
 * Стратегия определения периода продолжительностью в один день.
 */
@Service
public class DayPeriodStrategy implements PeriodStrategy {

    @Override
    public LocalDate getEndDate(LocalDate startDate) {
        return startDate.plusDays(1);
    }

    @Override
    public PeriodStrategyType getType() {
        return PeriodStrategyType.DAY;
    }
}
