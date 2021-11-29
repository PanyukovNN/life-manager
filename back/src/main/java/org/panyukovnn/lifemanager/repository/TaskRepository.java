package org.panyukovnn.lifemanager.repository;

import org.panyukovnn.lifemanager.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Репозиторий задач
 */
public interface TaskRepository extends MongoRepository<Task, String> {

}
