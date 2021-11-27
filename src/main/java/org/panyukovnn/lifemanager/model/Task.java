package org.panyukovnn.lifemanager.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Comparator;

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
    private LocalDateTime creationDateTime;

    @Override
    public int compareTo(Task task) {
        // TODO вынести в отдельный класс несколько компараторов, в зависимости от порядка
        return Comparator.comparing(Task::getPriority)
                .thenComparing(
                        Comparator.nullsFirst(Comparator.comparing(Task::getCompletionDateTime)))
                .compare(this, task);
    }
}
