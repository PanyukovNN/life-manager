package org.panyukovnn.lifemanager.service;

import io.micrometer.core.instrument.util.StringUtils;
import org.panyukovnn.lifemanager.model.Task;
import org.panyukovnn.lifemanager.model.TaskStatus;
import org.panyukovnn.lifemanager.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

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
     * @param id идентификатор
     * @param priority приортитет
     * @param description текст
     * @param status статус
     * @param completionDateTime дата и время выполнения
     * @return созданная/обновленная задача
     */
    //TODO методы должны получать подготовленные данные
    public Task createUpdate(String id,
                             String priority,
                             String description,
                             String status,
                             LocalDateTime completionDateTime) {


        Task task = new Task();

        if (StringUtils.isNotBlank(id)) {
            Task taskFromDb = taskRepository.findById(id).orElse(null);

            if (taskFromDb != null) {
                task = taskFromDb;
            } else {
                task.setCreationDateTime(LocalDateTime.now());
            }
        }

        task.setPriority(definePriority(priority));
        task.setDescription(description);
        task.setStatus(TaskStatus.valueOf(status));
        task.setCompletionDateTime(completionDateTime);

        return taskRepository.save(task);
    }

    /**
     * Поиск задач по набору параметров
     * Если какой либо из параметров равен null, то он не учитывается
     *
     * @param priority приоритет
     * @param taskStatuses список статусов
     * @param categories список категорий
     * @param startDate дата начала
     * @param endDate дата окончания
     * @return список найденных задач
     */
    public List<Task> findList(Integer priority,
                               List<String> taskStatuses,
                               List<String> categories,
                               LocalDate startDate,
                               LocalDate endDate) {
        //TODO отсортировать
//        return taskRepository.findList(priority, taskStatuses, categories, startDate, endDate);

        return taskRepository.findList(priority, taskStatuses);
    }

    /**
     * Вернуть все задачи, отсортированные сначала по приоритету, затем по дате
     *
     * @return список задач
     */
    public List<Task> findAll() {
        List<Task> allTasks = taskRepository.findAll();
        allTasks.sort(Collections.reverseOrder());

        return allTasks;
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
