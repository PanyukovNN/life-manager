package org.panyukovnn.lifemanager.service;

import io.micrometer.core.instrument.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.panyukovnn.lifemanager.exception.NotFoundException;
import org.panyukovnn.lifemanager.model.Category;
import org.panyukovnn.lifemanager.model.Task;
import org.panyukovnn.lifemanager.repository.CategoryRepository;
import org.panyukovnn.lifemanager.repository.TaskRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityExistsException;
import java.util.List;
import java.util.Optional;

import static org.panyukovnn.lifemanager.model.Constants.*;

/**
 * Сервис категорий задач.
 */
@Service
@RequiredArgsConstructor
public class CategoryService {

    private final TaskRepository taskRepository;
    private final CategoryRepository categoryRepository;

    /**
     * Создать/обновить категорию.
     * Запрещено создавать категории с одинаковыми именами.
     *
     * @param categoryTemplate частично заполненная сущность категории
     */
    @Transactional
    public void createUpdate(Category categoryTemplate) {
        if (StringUtils.isBlank(categoryTemplate.getId())) {
            categoryRepository.findByName(categoryTemplate.getName())
                    .ifPresent(sameNameCategory -> {
                        throw new EntityExistsException(sameNameCategory.isRecentlyDeleted()
                                ? RECENTLY_DELETED_CATEGORY_ALREADY_EXISTS_ERROR_MSG
                                : CATEGORY_ALREADY_EXISTS_ERROR_MSG);
                    });
        }

        categoryRepository.save(categoryTemplate);
    }

    /**
     * Найти по наименованию.
     *
     * @param name наименование
     * @return категория
     */
    public Optional<Category> findByName(String name) {
        return categoryRepository.findByName(name);
    }

    /**
     * Вернуть список категорий по заданным параметрам.
     *
     * @param recentlyDeleted флаг недавно удаленной категории
     * @return список категорий
     */
    public List<Category> findList(boolean recentlyDeleted) {
        return categoryRepository.findByRecentlyDeleted(recentlyDeleted);
    }

    /**
     * Поместить категорию в недавно удаленные.
     *
     * @param name наименование категории
     */
    @Transactional
    public void moveToRecentlyDeleted(String name) {
        Category category = categoryRepository.findByNameAndRecentlyDeleted(name, false)
                .orElseThrow(() -> new NotFoundException(CATEGORY_NOT_FOUND_ERROR_MSG));

        category.setRecentlyDeleted(true);

        categoryRepository.save(category);
    }

    /**
     * Восстановить категорию из недавно удаленных.
     *
     * @param name наименование категории
     */
    @Transactional
    public void recoverFromRecentlyDeleted(String name) {
        Category category = categoryRepository.findByNameAndRecentlyDeleted(name, true)
                .orElseThrow(() -> new NotFoundException(CATEGORY_NOT_FOUND_ERROR_MSG));

        category.setRecentlyDeleted(false);

        categoryRepository.save(category);
    }

    /**
     * Удалить категорию по наименованию и удалить все задачи, закреплённые за данной категорией.
     *
     * @param name наименование
     */
    @Transactional
    public void deleteByName(String name) {
        boolean existsByName = categoryRepository.existsByName(name);
        if (!existsByName) {
            throw new NotFoundException(CATEGORY_NOT_FOUND_ERROR_MSG);
        }

        List<Task> categoryTasks = taskRepository.findByCategoryName(name);
        taskRepository.deleteAll(categoryTasks);

        categoryRepository.deleteByName(name);
    }
}
