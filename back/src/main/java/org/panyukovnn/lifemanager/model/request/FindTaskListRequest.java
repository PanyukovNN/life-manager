package org.panyukovnn.lifemanager.model.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.panyukovnn.lifemanager.model.TaskSortType;
import org.panyukovnn.lifemanager.model.TaskStatus;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;
import java.util.List;

import static org.panyukovnn.lifemanager.model.Constants.PRIORITY_PATTERN_OR_EMPTY;
import static org.panyukovnn.lifemanager.model.Constants.WRONG_PRIORITY_ERROR_MSG;

/**
 * Запрос на поиск задач по набору параметров.
 */
@Getter
@Setter
@NoArgsConstructor
public class FindTaskListRequest {

    @Pattern(regexp = PRIORITY_PATTERN_OR_EMPTY, message = WRONG_PRIORITY_ERROR_MSG)
    private String priority;

    @NotNull
    private List<TaskStatus> taskStatuses;

    @NotNull
    private List<String> categoryNames;

    private LocalDate doneStartDate;

    private LocalDate doneEndDate;

    @NotNull
    private TaskSortType sortType;
}
