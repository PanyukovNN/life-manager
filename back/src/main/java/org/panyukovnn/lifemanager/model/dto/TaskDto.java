package org.panyukovnn.lifemanager.model.dto;

import lombok.Getter;
import lombok.ToString;
import org.panyukovnn.lifemanager.model.Task;
import org.panyukovnn.lifemanager.service.ControllerHelper;

import static org.panyukovnn.lifemanager.service.ControllerHelper.FRONT_D_FORMATTER;
import static org.panyukovnn.lifemanager.service.ControllerHelper.FRONT_T_FORMATTER;

/**
 * Транспортный объект задачи
 */
@Getter
@ToString
public class TaskDto {

    private final String id;
    private final String description;
    private final String priority;
    private final String category;
    private String completionDate;
    private String completionTime;

    /**
     * Конструктор
     *
     * @param task задача
     */
    public TaskDto(Task task) {
        if (task == null) {
            throw new IllegalArgumentException();
        }

        this.id = task.getId();
        this.description = task.getDescription();
        this.priority = ControllerHelper.priorityToParam(task.getPriority());
        this.category = task.getCategory().getName();

        if (task.getCompletionDate() != null) {
            this.completionDate = FRONT_D_FORMATTER.format(task.getCompletionDate());
        }

        if (task.getCompletionTime() != null) {
            this.completionTime = FRONT_T_FORMATTER.format(task.getCompletionTime());
        }
    }
}
