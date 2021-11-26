package org.panyukovnn.lifemanager.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Категория задачи
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
     * Наименование
     */
    private String name;
}
