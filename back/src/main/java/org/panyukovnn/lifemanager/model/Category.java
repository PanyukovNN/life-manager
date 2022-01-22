package org.panyukovnn.lifemanager.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * Категория задачи.
 */
@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Наименование.
     */
    private String name;

    /**
     * Недавно удаленная.
     * Удаляется окончательно по просшествии 30 дней.
     */
    private boolean recentlyDeleted;

    /**
     * Дата выставления флага 'недавно удалена'
     */
    private LocalDateTime deletionDateTime;
}
