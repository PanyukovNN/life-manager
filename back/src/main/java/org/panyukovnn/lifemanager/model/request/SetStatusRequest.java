package org.panyukovnn.lifemanager.model.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.panyukovnn.lifemanager.model.TaskStatus;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * Запрос на изменение статуса списка задач.
 */
@Getter
@Setter
@NoArgsConstructor
public class SetStatusRequest {

    @NotNull
    public List<Long> ids;

    @NotNull
    public TaskStatus status;
}
