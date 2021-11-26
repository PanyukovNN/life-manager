package org.panyukovnn.lifemanager.model.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * Запрос на создание/изменение задачи
 */
@Getter
@Setter
@NoArgsConstructor
public class CreateUpdateTaskRequest {

    public String id;
    public String description;
    public String priority;
    public String category;
    public String status;
    public LocalDateTime completionDateTime;
}
