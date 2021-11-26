package org.panyukovnn.lifemanager.service;

import io.micrometer.core.instrument.util.StringUtils;
import org.panyukovnn.lifemanager.model.Task;
import org.panyukovnn.lifemanager.model.TaskStatus;
import org.panyukovnn.lifemanager.model.request.CreateUpdateTaskRequest;
import org.panyukovnn.lifemanager.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.Objects;

import static org.panyukovnn.lifemanager.model.Constants.NULL_CREATE_UPDATE_TASK_REQUEST_ERROR_MSG;
import static org.panyukovnn.lifemanager.model.Constants.WRONG_PRIORITY_STRING_VALUE_ERROR_MSG;

/**
 * Сервис задач
 */
@Service
public class TaskService {

    private final TaskRepository taskRepository;

    /**
     * Конструктор
     *
     * @param taskRepository репозиторий задач
     */
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    /**
     * Создать/обновить задачу
     *
     * @param request запрос
     * @return созданная/обновленная задача
     */
    public Task createUpdate(CreateUpdateTaskRequest request) {
        Objects.requireNonNull(request, NULL_CREATE_UPDATE_TASK_REQUEST_ERROR_MSG);

        Task task = new Task();

        if (StringUtils.isNotBlank(request.getId())) {
            Task taskFromDb = taskRepository.findById(request.getId()).orElse(null);

            if (taskFromDb != null) {
                task = taskFromDb;
            }
        }

        task.setPriority(definePriority(request.getPriority()));
        task.setDescription(request.getDescription());
        task.setStatus(TaskStatus.valueOf(request.getStatus()));
        task.setCompletionDateTime(request.getCompletionDateTime());

        return taskRepository.save(task);
    }

    /**
     * Удалить задачу по идентификатору
     *
     * @param id идентификатор
     */
    public void deleteById(String id) {
        taskRepository.deleteById(id);
    }

    /**
     * Определить числовое значение приоритета по строчной записи
     * Например строке А1 соответствует приоритет 15
     *
     * @param priorityParam строчная запись приоритета
     * @return числовое значение приоритета
     */
    private int definePriority(String priorityParam) {
        if (StringUtils.isBlank(priorityParam) || priorityParam.length() != 2) {
            throw new IllegalArgumentException(WRONG_PRIORITY_STRING_VALUE_ERROR_MSG);
        }

        char letter = priorityParam.charAt(0);
        int digit = Character.getNumericValue(priorityParam.charAt(1));

        if (letter < 'A' || letter > 'D'
                || digit < 1 || digit > 4) {
            throw new IllegalArgumentException(WRONG_PRIORITY_STRING_VALUE_ERROR_MSG);
        }

        // Возвращает максимальное число диапазона по букве (Например, если А то 4, если D то 0)
        int multiplier = 4 * (4 - letter + 'A');

        // Уменьшаем максимальное число диапазона на число (Например, если А2 то 14, если C4 то 4)
        return multiplier - digit;
    }
}
