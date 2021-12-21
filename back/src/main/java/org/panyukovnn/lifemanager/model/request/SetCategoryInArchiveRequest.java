package org.panyukovnn.lifemanager.model.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

/**
 * Запрос выставление флага inArchive у сущности категории
 */
@Getter
@Setter
@NoArgsConstructor
public class SetCategoryInArchiveRequest {

    @NotBlank
    private String name;

    private boolean inArchive;
}
