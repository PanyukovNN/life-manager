package org.panyukovnn.lifemanager.repository;

import org.panyukovnn.lifemanager.model.Task;
import org.panyukovnn.lifemanager.model.TaskStatus;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

/**
 * Репозиторий задач
 */
public interface TaskRepository extends MongoRepository<Task, String> {

    /**
     * Вернуть список задач по идентификатору
     *
     * @param ids список идентификаторов
     */
    List<Task> findByIdIn(List<String> ids);
}
