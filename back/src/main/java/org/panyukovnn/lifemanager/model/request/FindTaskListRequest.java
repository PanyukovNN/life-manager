package org.panyukovnn.lifemanager.model.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.panyukovnn.lifemanager.model.PeriodStrategyType;
import org.panyukovnn.lifemanager.model.TaskCompareType;
import org.panyukovnn.lifemanager.model.TaskStatus;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

/**
 * Запрос на поиск задач
 */
@Getter
@Setter
@NoArgsConstructor
public class FindTaskListRequest {

    public String priority;
    public List<TaskStatus> taskStatuses;
    public List<String> categories;
    public PeriodStrategyType periodType;

    @NotNull
    public TaskCompareType compareType;
}
