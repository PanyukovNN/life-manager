package org.panyukovnn.lifemanager.model.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.panyukovnn.lifemanager.model.Category;
import org.panyukovnn.lifemanager.model.TaskStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Запрос на поиск задач
 */
@Getter
@Setter
@NoArgsConstructor
public class FindTaskListRequest {

    public Integer priority;
    public List<String> taskStatuses;
    public List<String> categories;
    public LocalDate startDate;
    public LocalDate endDate;
}
