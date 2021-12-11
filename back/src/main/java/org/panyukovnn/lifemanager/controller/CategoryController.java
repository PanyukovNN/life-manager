package org.panyukovnn.lifemanager.controller;

import org.panyukovnn.lifemanager.model.Category;
import org.panyukovnn.lifemanager.model.request.CreateUpdateCategoryRequest;
import org.panyukovnn.lifemanager.model.request.DeleteByNameRequest;
import org.panyukovnn.lifemanager.model.request.FindCategoryByNameRequest;
import org.panyukovnn.lifemanager.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Objects;

import static org.panyukovnn.lifemanager.model.Constants.*;

/**
 * Контроллер категорий
 */
@CrossOrigin
@RestController
@RequestMapping("/category")
public class CategoryController {

    private final CategoryService categoryService;

    /**
     * Конструктор
     *
     * @param categoryService сервис категорий
     */
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    /**
     * Создать/обновить категорию
     *
     * @param request запрос
     * @return созданная/обновленная категория
     */
    @PostMapping("/create-update")
    public Category createUpdateCategory(@RequestBody CreateUpdateCategoryRequest request) {
        return categoryService.createUpdate(request.getId(), request.getName());
    }

    /**
     * Найти категорию по наименованию
     *
     * @param request запрос
     * @return категория
     */
    @GetMapping("/find-by-name")
    public Category findByName(@RequestBody @Valid FindCategoryByNameRequest request) {
        return categoryService.findByName(request.getName());
    }

    /**
     * Вернуть все категории
     *
     * @return список категорий
     */
    @GetMapping("/find-all")
    public List<Category> findAll() {
        return categoryService.findAll();
    }

    /**
     * Удалить категорию по имени
     *
     * @param request запрос
     * @return сообщение об успешном удалении
     */
    @DeleteMapping("/delete-by-name")
    public String deleteById(@RequestBody @Valid DeleteByNameRequest request) {
        categoryService.deleteByName(request.getName());

        return String.format(CATEGORY_REMOVED_SUCCESSFULLY, request.getName());
    }
}
