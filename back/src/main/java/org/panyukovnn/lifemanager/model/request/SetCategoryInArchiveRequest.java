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
    public String name;

    public boolean inArchive;
}
