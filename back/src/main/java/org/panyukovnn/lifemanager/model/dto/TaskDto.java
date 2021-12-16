package org.panyukovnn.lifemanager.model.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

/**
 * Транспортный объект задачи
 */
@Getter
@Builder
@ToString
public class TaskDto {

    private final String id;
    private final String description;
    private final String priority;
    private final String category;
    private final String plannedDate;
    private final String plannedTime;
}
