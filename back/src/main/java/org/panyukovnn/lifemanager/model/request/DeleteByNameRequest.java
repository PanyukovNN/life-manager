package org.panyukovnn.lifemanager.model.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

/**
 * Запрос на удаление по наименованию.
 */
@Getter
@Setter
@NoArgsConstructor
public class DeleteByNameRequest {

    @NotBlank
    public String name;
}
