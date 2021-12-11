package org.panyukovnn.lifemanager.model.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.panyukovnn.lifemanager.model.PeriodStrategyType;
import org.panyukovnn.lifemanager.model.TaskCompareType;
import org.panyukovnn.lifemanager.model.TaskStatus;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;
import java.util.List;

import static org.panyukovnn.lifemanager.model.Constants.*;

/**
 * Запрос на поиск задач по набору параметров
 */
@Getter
@Setter
@NoArgsConstructor
public class FindTaskListRequest {

    @Pattern(regexp = PRIORITY_LETTER_PATTERN_OR_EMPTY, message = WRONG_PRIORITY_STRING_VALUE_ERROR_MSG)
    public String priorityLetter;

    @NotNull
    public List<TaskStatus> taskStatuses;

    @NotNull
    public List<String> categories;

    @NotNull
    public PeriodStrategyType periodType;

    @NotNull
    public TaskCompareType compareType;
}
