package org.panyukovnn.lifemanager.controller;

import org.panyukovnn.lifemanager.model.Category;
import org.panyukovnn.lifemanager.model.request.CreateUpdateCategoryRequest;
import org.panyukovnn.lifemanager.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

import static org.panyukovnn.lifemanager.model.Constants.ERROR_OCCURRED_MSG;
import static org.panyukovnn.lifemanager.model.Constants.NULL_CREATE_UPDATE_CATEGORY_REQUEST_ERROR_MSG;

/**
 * Контроллер категорий
 */
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
        Objects.requireNonNull(request, NULL_CREATE_UPDATE_CATEGORY_REQUEST_ERROR_MSG);

        return categoryService.createUpdate(request.getId(), request.getName());
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
     * Обработчик ошибок
     *
     * @param e исключение
     * @return сообщение об ошибке
     */
    // TODO написать аспект
    @ExceptionHandler(Exception.class)
    public String handleException(Exception e) {
        e.printStackTrace();

        return ERROR_OCCURRED_MSG + e.getMessage();
    }
}
