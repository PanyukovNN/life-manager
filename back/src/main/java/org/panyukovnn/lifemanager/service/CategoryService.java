package org.panyukovnn.lifemanager.service;

import io.micrometer.core.instrument.util.StringUtils;
import org.panyukovnn.lifemanager.exception.NotFoundException;
import org.panyukovnn.lifemanager.model.Category;
import org.panyukovnn.lifemanager.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityExistsException;
import java.util.List;

import static org.panyukovnn.lifemanager.model.Constants.CATEGORY_ALREADY_EXISTS_ERROR_MSG;
import static org.panyukovnn.lifemanager.model.Constants.CATEGORY_NOT_FOUND_ERROR_MSG;

/**
 * Сервис категорий задач
 */
@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    /**
     * Конструктор
     *
     * @param categoryRepository репозиторий категорий
     */
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
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
     * Вернуть все категории
     *
     * @return список категорий
     */
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    /**
     * Удалить категорию по наименованию
     *
     * @param name наименование
     */
    public void deleteByName(String name) {
        categoryRepository.deleteByName(name);
    }
}
