package org.panyukovnn.lifemanager.service;

import io.micrometer.core.instrument.util.StringUtils;
import lombok.RequiredArgsConstructor;
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
     * Запрещено создавать категорию с одинаковыми именами.
     *
     * @param id идентификатор
     * @param name наименование
     */
    @Transactional
    public void createUpdate(String id, String name) {
        Category category = new Category();

        Category categoryFromDb = categoryRepository.findByName(name).orElse(null);

        if (categoryFromDb != null) {
            if (categoryFromDb.isInArchive()) {
                categoryFromDb.setInArchive(false);

                categoryRepository.save(categoryFromDb);

                return;
            }

            throw new EntityExistsException(CATEGORY_ALREADY_EXISTS_ERROR_MSG);
        }

        if (StringUtils.isNotBlank(id)) {
            categoryRepository.findById(id).ifPresent(c -> {
                category.setId(c.getId());
                category.setInArchive(c.isInArchive());
            });
        }

        category.setName(name);

        categoryRepository.save(category);
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
     * @param inArchive флаг в/вне архива
     * @return список категорий
     */
    public List<Category> findList(boolean inArchive) {
        return categoryRepository.findByInArchive(inArchive);
    }

    /**
     * Удалить категорию по наименованию.
     * Запрещено удалять категории, за которыми закреплены невыполненные задачи.
     * Если у удаляемой категории есть выполненные задачи выставляется флаг previouslyExisted
     * и она не удаляется.
     *
     * @param name наименование
     */
    @Transactional
    public void deleteByName(String name) {
        boolean existsByName = categoryRepository.existsByName(name);
        if (!existsByName) {
            throw new NotFoundException(CATEGORY_NOT_FOUND_ERROR_MSG);
        }

        boolean doneTaskExists = taskRepository.existsByCategoryNameAndStatus(name, TaskStatus.DONE);

        if (doneTaskExists) {
            throw new UnableToRemoveException(UNABLE_TO_DELETE_CATEGORY_ERROR_MSG);
        }

        categoryRepository.deleteByName(name);
    }

    /**
     * Установить флаг toArchive.
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
