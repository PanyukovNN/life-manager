package org.panyukovnn.lifemanager.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

/**
 * Задача.
 */
@Getter
@Setter
@ToString
@NoArgsConstructor
@Document(collection = "task")
public class Task {

    @Id
    private String id;

    /**
     * Текст задачи.
     */
    private String description;

    /**
     * Приоритет может иметь значения от 0 до 15.
     * 15 - A1
     *  0 - D4
     */
    private int priority;

    /**
     * Наименование категории (не может быть пустым).
     */
    private String categoryName;

    /**
     * Статус задачи.
     */
    private TaskStatus status;

    /**
     * Пларинуемая дата выполнения.
     */
    private LocalDate plannedDate;

    /**
     * Планируемое время выполнения (не может быть заполнено без планируемой даты выполнения).
     */
    private LocalTime plannedTime;

    /**
     * Дата и время создания.
     */
    private LocalDateTime creationDateTime;
}
