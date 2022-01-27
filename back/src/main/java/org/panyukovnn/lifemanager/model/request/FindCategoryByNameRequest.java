package org.panyukovnn.lifemanager.model.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

/**
 * Запрос на поиск категории по наименованию.
 */
@Getter
@Setter
@NoArgsConstructor
public class FindCategoryByNameRequest {

    @NotBlank
    private String name;
}
