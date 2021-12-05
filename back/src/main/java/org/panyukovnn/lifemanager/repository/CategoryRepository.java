package org.panyukovnn.lifemanager.repository;

import org.panyukovnn.lifemanager.model.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

/**
 * Репозиторий категорий задач
 */
public interface CategoryRepository extends MongoRepository<Category, String> {

    /**
     * Найти по наименованию
     *
     * @param name наименование
     * @return категория
     */
    Optional<Category> findByName(String name);

    /**
     * Удалить по наименованию
     *
     * @param name наименование
     */
    void deleteByName(String name);
}
