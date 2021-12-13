package org.panyukovnn.lifemanager.service;

import io.micrometer.core.instrument.util.StringUtils;
import org.panyukovnn.lifemanager.exception.NotFoundException;
import org.panyukovnn.lifemanager.exception.UnableToRemoveException;
import org.panyukovnn.lifemanager.model.Category;
import org.panyukovnn.lifemanager.model.TaskStatus;
import org.panyukovnn.lifemanager.repository.CategoryRepository;
import org.panyukovnn.lifemanager.repository.TaskRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityExistsException;
import java.util.List;

import static org.panyukovnn.lifemanager.model.Constants.*;

/**
 * Сервис категорий задач
 */
@Service
public class CategoryService {

    private final TaskRepository taskRepository;
    private final CategoryRepository categoryRepository;

    /**
     * Конструктор
     *
     * @param categoryRepository репозиторий категорий
     * @param taskRepository репозиторий задач
     */
    public CategoryService(CategoryRepository categoryRepository, TaskRepository taskRepository) {
        this.categoryRepository = categoryRepository;
        this.taskRepository = taskRepository;
    }

    /**
     * Создать/обновить категорию
     *
     * @param id идентификатор
     * @param name наименование
     * @return созданная/обновленная категория
     */
    public Category createUpdate(String id, String name) {
        Category category = new Category();

        if (StringUtils.isNotBlank(id)) {
            Category categoryFromDb = categoryRepository.findById(id).orElse(null);

            if (category.getName().equals(name)) {
                throw new EntityExistsException(CATEGORY_ALREADY_EXISTS_ERROR_MSG);
            }

            if (categoryFromDb != null) {
                category = categoryFromDb;
            }
        }

        category.setName(name);

        return categoryRepository.save(category);
    }

    /**
     * Найти по наименованию
     *
     * @param name наименование
     * @return категория
     */
    public Category findByName(String name) {
        return categoryRepository.findByName(name)
                .orElseThrow(() -> new NotFoundException(CATEGORY_NOT_FOUND_ERROR_MSG));
    }

    /**
     * Вернуть категории вне архива
     *
     * @return список категорий
     */
    public List<Category> findUnarchived() {
        return categoryRepository.findByInArchiveFalse();
    }

    /**
     * Удалить категорию по наименованию
     * Запрещено удалять категории, за которыми закреплены невыполненные задачи
     * Если у удаляемой категории есть выполненные задачи выставляется флаг previouslyExisted
     * и она не удаляется
     *
     * @param name наименование
     */
    @Transactional
    public void deleteByName(String name) {
        categoryRepository.findByName(name)
                .orElseThrow(() -> new NotFoundException(CATEGORY_NOT_FOUND_ERROR_MSG));

        boolean doneTaskExists = taskRepository.existsByCategoryNameAndStatus(name, TaskStatus.DONE);

        if (doneTaskExists) {
            throw new UnableToRemoveException(UNABLE_TO_DELETE_CATEGORY_ERROR_MSG);
        }

        categoryRepository.deleteByName(name);
    }

    /**
     * Установить флаг toArchive
     *
     * @param name наименование категории
     * @param inArchive флаг нахождения в архиве
     */
    @Transactional
    public void setToArchiveByName(String name, boolean inArchive) {
        Category category = categoryRepository.findByName(name)
                .orElseThrow(() -> new NotFoundException(CATEGORY_NOT_FOUND_ERROR_MSG));

        if (category.isInArchive()) {
            throw new UnableToRemoveException(String.format(CATEGORY_ALREADY_IN_ARCHIVE_ERROR_MSG, name));
        }

        boolean todoTaskExists = taskRepository.existsByCategoryNameAndStatus(name, TaskStatus.TO_DO);

        if (todoTaskExists) {
            throw new UnableToRemoveException(UNABLE_TO_SET_CATEGORY_IN_ARCHIVE_ERROR_MSG);
        }

        category.setInArchive(inArchive);
        categoryRepository.save(category);
    }
}
