package org.panyukovnn.lifemanager.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Document(collection = "customer")
public class Task implements Comparable<Task> {

    @Id
    private String id;

    private String description;

    /**
     * Приоритет может иметь значения от 1 до 16
     */
    private int priority;

    @CreatedDate
    private LocalDateTime creationDateTime;

    @Override
    public int compareTo(Task task) {
        return Integer.compare(this.priority, task.priority);
    }
}
