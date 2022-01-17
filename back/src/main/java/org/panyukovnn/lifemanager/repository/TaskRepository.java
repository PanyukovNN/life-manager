package org.panyukovnn.lifemanager.repository;

import org.panyukovnn.lifemanager.model.Task;
import org.panyukovnn.lifemanager.model.TaskStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * Репозиторий задач.
 */
public interface TaskRepository extends MongoRepository<Task, String> {

    /**
     * Вернуть список задач по идентификатору.
     *
     * @param ids список идентификаторов
     */
    List<Task> findByIdIn(List<String> ids);

    /**
     * Вернуть список задач по наименованию категории.
     *
     * @param categoryName наименование категории
     */
    List<Task> findByCategoryName(String categoryName);

    /**
     * Существуют ли задачи с заданной категорией и статусом.
     *
     * @param categoryName наименование категории
     * @param status статус
     * @return существуют ли задачи
     */
    Boolean existsByCategoryNameAndStatus(String categoryName, TaskStatus status);
}
