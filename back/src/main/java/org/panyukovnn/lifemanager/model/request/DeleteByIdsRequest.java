package org.panyukovnn.lifemanager.model.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

import static org.panyukovnn.lifemanager.model.Constants.EMPTY_DELETE_IDS_ERROR_MSG;

/**
 * Запрос на удаление по списку идентификаторов.
 */
@Getter
@Setter
@NoArgsConstructor
public class DeleteByIdsRequest {

    @NotNull
    @NotEmpty(message = EMPTY_DELETE_IDS_ERROR_MSG)
    private List<Long> ids;
}
