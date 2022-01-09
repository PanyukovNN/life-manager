package org.panyukovnn.lifemanager.service.periodstrategy;

import org.panyukovnn.lifemanager.model.PeriodStrategyType;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

/**
 * Стратегия определения периода продолжительностью в одну неделю.
 */
@Service
public class AllPeriodStrategy implements PeriodStrategy {

    @Override
    public LocalDate getEndDate(LocalDate startDate) {
        return LocalDate.MAX;
    }

    @Override
    public PeriodStrategyType getType() {
        return PeriodStrategyType.ALL;
    }
}
