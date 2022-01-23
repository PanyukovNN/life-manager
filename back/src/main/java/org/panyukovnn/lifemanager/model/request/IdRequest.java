package org.panyukovnn.lifemanager.model.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

/**
 * Запрос для передачи идентификатора.
 */
@Getter
@Setter
@NoArgsConstructor
public class IdRequest {

    @NotNull
    public Long id;
}
