package org.panyukovnn.lifemanager.model.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

/**
 * Запрос на удаление по идентификатору.
 */
@Getter
@Setter
@NoArgsConstructor
public class DeleteByIdRequest {

    @NotBlank
    public String id;
}
