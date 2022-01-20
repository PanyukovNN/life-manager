package org.panyukovnn.lifemanager.repository;

import org.panyukovnn.lifemanager.model.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
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
     * Возвращает категории по флагу 'недавно удалена'.
     *
     * @param recentlyDeleted флаг 'недавно удалена'
     * @return спиоск категорий
     */
    List<Category> findByRecentlyDeleted(boolean recentlyDeleted);

    /**
     * Возвращает недавно удаленные категории, удаленные до заданной даты.
     *
     * @param deletionDateTime дата/время удаления
     * @return список категорий
     */
    List<Category> findByRecentlyDeletedIsTrueAndDeletionDateTimeIsBefore(LocalDateTime deletionDateTime);

    /**
     * Найти категории по списку наименований наименованию.
     *
     * @param names список наименований
     * @return список категорий
     */
    List<Category> findByNameIn(List<String> names);
}
