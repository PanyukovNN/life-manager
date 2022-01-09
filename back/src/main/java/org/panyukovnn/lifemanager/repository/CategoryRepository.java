package org.panyukovnn.lifemanager.repository;

import org.panyukovnn.lifemanager.model.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

/**
 * Репозиторий категорий задач.
 */
public interface CategoryRepository extends MongoRepository<Category, String> {

    /**
     * Найти по наименованию.
     *
     * @param name наименование
     * @return категория
     */
    Optional<Category> findByName(String name);

    /**
     * Существует ли категория с заданным наименованием.
     *
     * @param name наименование
     * @return существует ли категория
     */
    Boolean existsByName(String name);

    /**
     * Удалить по наименованию.
     *
     * @param name наименование
     */
    void deleteByName(String name);

    /**
     * Возвращает категории по флагу в/вне архива.
     *
     * @param inArchive флаг в/вне архива
     * @return спиоск категорий
     */
    List<Category> findByInArchive(boolean inArchive);
}
