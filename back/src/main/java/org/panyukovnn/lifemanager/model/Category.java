package org.panyukovnn.lifemanager.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Категория задачи.
 */
@Getter
@Setter
@ToString
@NoArgsConstructor
@Document(collection = "category")
public class Category {

    @Id
    private String id;

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
