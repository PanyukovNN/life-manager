package org.panyukovnn.lifemanager.service.periodstrategy;

import org.panyukovnn.lifemanager.model.PeriodStrategyType;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

/**
 * Стратегия определения периода продолжительностью в один месяц
 */
@Service
public class MonthPeriodStrategy implements PeriodStrategy {

    @Override
    public LocalDate getEndDate(LocalDate startDate) {
        return startDate.plusMonths(1);
    }

    @Override
    public PeriodStrategyType getType() {
        return PeriodStrategyType.MONTH;
    }
}
