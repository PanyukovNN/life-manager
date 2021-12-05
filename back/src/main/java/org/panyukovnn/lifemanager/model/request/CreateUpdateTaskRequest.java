package org.panyukovnn.lifemanager.model.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;

/**
 * Запрос на создание/изменение задачи
 */
@Getter
@Setter
@NoArgsConstructor
public class CreateUpdateTaskRequest {

    public String id;

    @NotBlank
    public String description;

    @NotBlank
    public String priority;

    @NotNull
    public String category;

    public String status;
    public LocalDate completionDate;
    public LocalTime completionTime;
}
