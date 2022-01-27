package org.panyukovnn.lifemanager.model.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.panyukovnn.lifemanager.model.TaskStatus;

import javax.validation.constraints.NotNull;

/**
 * Запрос на изменение статуса задачи.
 */
@Getter
@Setter
@NoArgsConstructor
public class SetStatusRequest {

    @NotNull
    private Long id;

    @NotNull
    private TaskStatus status;
}
