package org.panyukovnn.lifemanager.model.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.panyukovnn.lifemanager.model.Task;

/**
 * Транспортный объект задачи {@link Task}.
 */
@Getter
@Builder
@ToString
public class TaskDto {

    private final Long id;
    private final String description;
    private final String priority;
    private final Long categoryId;
    private final String plannedDate;
    private final String plannedTime;
    private final String status;

    /**
     * Просрочена ли задача.
     */
    private final boolean overdue;
}
