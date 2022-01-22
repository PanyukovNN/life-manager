package org.panyukovnn.lifemanager.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

/**
 * Задача.
 */
@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@Table(name = "task")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Текст задачи.
     */
    @Column
    private String description;

    /**
     * Приоритет может иметь следующие значения:
     * A - важная и срочная
     * B - важная и несрочная
     * C - неважная и срочная
     * D - неважная и несрочная
     */
    @Column
    private String priority;

    /**
     * Идентификатор категории (не может быть пустым).
     */
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    /**
     * Статус задачи.
     */
    @Column
    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    /**
     * Пларинуемая дата выполнения.
     */
    @Column
    private LocalDate plannedDate;

    /**
     * Планируемое время выполнения (не может быть заполнено без планируемой даты выполнения).
     */
    @Column
    private LocalTime plannedTime;

    /**
     * Дата и время создания.
     */
    @Column
    private LocalDateTime creationDateTime;
}
