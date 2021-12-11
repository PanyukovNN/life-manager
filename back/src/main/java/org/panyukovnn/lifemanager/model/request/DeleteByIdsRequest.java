package org.panyukovnn.lifemanager.model.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * Запрос на удаление по списку идентификаторов
 */
@Getter
@Setter
@NoArgsConstructor
public class DeleteByIdsRequest {

    @NotNull
    private List<String> ids;
}
