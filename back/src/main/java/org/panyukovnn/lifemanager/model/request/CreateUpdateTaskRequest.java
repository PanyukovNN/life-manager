package org.panyukovnn.lifemanager.model.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.panyukovnn.lifemanager.model.TaskStatus;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;
import java.time.LocalTime;

import static org.panyukovnn.lifemanager.model.Constants.PRIORITY_PATTERN;
import static org.panyukovnn.lifemanager.model.Constants.WRONG_PRIORITY_STRING_VALUE_ERROR_MSG;

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
    @Pattern(regexp = PRIORITY_PATTERN, message = WRONG_PRIORITY_STRING_VALUE_ERROR_MSG)
    public String priority;

    @NotBlank
    public String category;

    @NotNull
    public TaskStatus status;

    @JsonFormat(pattern = "dd-MM-yyyy")
    public LocalDate completionDate;

    @JsonFormat(pattern = "HH:mm")
    public LocalTime completionTime;
}
