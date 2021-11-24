package org.panyukovnn.lifemanager.repository;

import org.panyukovnn.lifemanager.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TaskRepository extends MongoRepository<Task, String> {


}
