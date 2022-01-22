package org.panyukovnn.lifemanager.model.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

/**
 * Запрос на создание/изменение категории задач.
 */
@Getter
@Setter
@NoArgsConstructor
public class CreateUpdateCategoryRequest {

    private Long id;

    @NotBlank
    private String name;
}
