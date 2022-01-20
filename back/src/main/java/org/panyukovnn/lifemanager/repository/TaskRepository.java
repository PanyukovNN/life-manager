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
     * Вернуть список задач по идентификатору категории.
     *
     * @param categoryId идентификатор категории
     */
    List<Task> findByCategoryId(String categoryId);
}
