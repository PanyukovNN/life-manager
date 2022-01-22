package org.panyukovnn.lifemanager.model.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

/**
 * Запрос для передачи идентификатора.
 */
@Getter
@Setter
@NoArgsConstructor
public class IdRequest {

    @NotBlank
    public Long id;
}
