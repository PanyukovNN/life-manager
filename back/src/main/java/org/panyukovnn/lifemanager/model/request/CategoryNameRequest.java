package org.panyukovnn.lifemanager.model.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

/**
 * Запрос, содержащий имя категории.
 */
@Getter
@Setter
@NoArgsConstructor
public class CategoryNameRequest {

    @NotBlank
    private String name;
}
