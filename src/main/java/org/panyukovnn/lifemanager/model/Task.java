package org.panyukovnn.lifemanager.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/**
 * Задача
 */
@Getter
@Setter
@ToString
@NoArgsConstructor
@Document(collection = "task")
public class Task implements Comparable<Task> {

    @Id
    private String id;

    /**
     * Текст задачи
     */
    private String description;

    /**
     * Приоритет может иметь значения от 0 до 15
     * 15 - A1
     *  0 - D4
     */
    private int priority;

    /**
     * Категория
     */
    private Category category;

    /**
     * Статус задачи
     */
    private TaskStatus status;

    /**
     * Дата и время выполнения
     */
    private LocalDateTime completionDateTime;

    /**
     * Дата и время создания
     */
    @CreationTimestamp
    private LocalDateTime creationDateTime;

    @Override
    public int compareTo(Task task) {
        return Integer.compare(this.priority, task.priority);
    }
}
