package org.panyukovnn.lifemanager.model.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

/**
 * Запрос на поиск разделов по набору параметров
 */
@Getter
@Setter
@NoArgsConstructor
public class FindCategoryListRequest {

    @NotNull
    public Boolean inArchive;
}
