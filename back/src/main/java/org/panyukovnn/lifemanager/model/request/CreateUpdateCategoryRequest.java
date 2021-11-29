package org.panyukovnn.lifemanager.model.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Запрос на создание/изменение категории задач
 */
@Getter
@Setter
@NoArgsConstructor
public class CreateUpdateCategoryRequest {

    public String id;
    public String name;
}
