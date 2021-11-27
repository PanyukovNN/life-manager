package org.panyukovnn.lifemanager.service;

import io.micrometer.core.instrument.util.StringUtils;
import org.panyukovnn.lifemanager.model.Category;
import org.panyukovnn.lifemanager.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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

            if (categoryFromDb != null) {
                category = categoryFromDb;
            }
        }

        category.setName(name);

        return categoryRepository.save(category);
    }

    /**
     * Вернуть все категории
     *
     * @return список категорий
     */
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }
}
