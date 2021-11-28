package org.panyukovnn.lifemanager.model.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

/**
 * Запрос на удаление категории по идентификатору
 */
@Getter
@Setter
@NoArgsConstructor
public class DeleteCategoryByIdRequest {

    @NotBlank
    public String id;
}
