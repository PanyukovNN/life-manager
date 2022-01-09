package org.panyukovnn.lifemanager.service.periodstrategy;

import org.panyukovnn.lifemanager.model.PeriodStrategyType;
import org.springframework.stereotype.Service;

import java.util.EnumMap;
import java.util.Map;
import java.util.Set;

/**
 * Менеджер стратегий определения периода.
 */
@Service
public class PeriodStrategyResolver {

    private final Map<PeriodStrategyType, PeriodStrategy> strategyMap = new EnumMap<>(PeriodStrategyType.class);

    /**
     * Конструктор.
     *
     * @param periodStrategies стратегия определения периода
     */
    public PeriodStrategyResolver(Set<PeriodStrategy> periodStrategies) {
        periodStrategies.forEach(strategy -> strategyMap.put(strategy.getType(), strategy));
    }

    /**
     * Возвращает стратегию по типу.
     *
     * @param type тип стратегии
     * @return стратегия
     */
    public PeriodStrategy resolve(PeriodStrategyType type) {
        return strategyMap.get(type);
    }
}
