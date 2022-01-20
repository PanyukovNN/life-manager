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
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.TimeZone;

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
     * Найти категории по списку наименований наименованию.
     *
     * @param names список наименований
     * @return список категорий
     */
    public List<Category> findByNameIn(List<String> names) {
        return categoryRepository.findByNameIn(names);
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
     * @param id идентификатор категории
     * @param timeZone часовой пояс клиента
     */
    @Transactional
    public Category moveToRecentlyDeleted(String id, TimeZone timeZone) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(CATEGORY_NOT_FOUND_ERROR_MSG));

        category.setRecentlyDeleted(true);
        category.setDeletionDateTime(LocalDateTime.now(timeZone.toZoneId()));

        return categoryRepository.save(category);
    }

    /**
     * Восстановить категорию из недавно удаленных.
     *
     * @param id идентификатор категории
     */
    @Transactional
    public Category recoverFromRecentlyDeleted(String id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(CATEGORY_NOT_FOUND_ERROR_MSG));

        category.setRecentlyDeleted(false);
        category.setDeletionDateTime(null);

        return categoryRepository.save(category);
    }

    /**
     * Удалить категорию по идентификатору и удалить все задачи, закреплённые за данной категорией.
     *
     * @param id идентификатор
     */
    @Transactional
    public void deleteById(String id) {
        boolean categoryExists = categoryRepository.existsById(id);
        if (!categoryExists) {
            throw new NotFoundException(CATEGORY_NOT_FOUND_ERROR_MSG);
        }

        List<Task> categoryTasks = taskRepository.findByCategoryId(id);
        taskRepository.deleteAll(categoryTasks);

        categoryRepository.deleteById(id);
    }

    /**
     * Удалить все категории и закрепленные за ними задачи.
     *
     * @param categories список категорий
     */
    @Transactional
    public void deleteAll(List<Category> categories) {
        List<Task> tasksToRemove = new ArrayList<>();

        for (Category category : categories) {
            List<Task> categoryTasks = taskRepository.findByCategoryId(category.getId());
            tasksToRemove.addAll(categoryTasks);
        }

        taskRepository.deleteAll(tasksToRemove);
        categoryRepository.deleteAll(categories);
    }
}
