package org.panyukovnn.lifemanager.repository;

import org.panyukovnn.lifemanager.model.Category;
import org.panyukovnn.lifemanager.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Репозиторий категорий задач
 */
public interface CategoryRepository extends MongoRepository<Category, String> {

}
