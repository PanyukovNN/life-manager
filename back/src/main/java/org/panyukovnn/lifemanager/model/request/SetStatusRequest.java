package org.panyukovnn.lifemanager.model.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.panyukovnn.lifemanager.model.PeriodStrategyType;
import org.panyukovnn.lifemanager.model.TaskCompareType;
import org.panyukovnn.lifemanager.model.TaskStatus;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * Запрос на изменение статуса списка задач
 */
@Getter
@Setter
@NoArgsConstructor
public class SetStatusRequest {

    @NotNull
    public List<String> ids;

    @NotNull
    public TaskStatus status;
}
