package org.panyukovnn.lifemanager.controller;

import org.panyukovnn.lifemanager.model.Category;
import org.panyukovnn.lifemanager.model.request.*;
import org.panyukovnn.lifemanager.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

import static org.panyukovnn.lifemanager.model.Constants.CATEGORY_REMOVED_SUCCESSFULLY;

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
     * Вернуть все категории по флагу inArchive
     *
     * @param request запрос
     * @return список категорий
     */
    @PostMapping("/find-list")
    public List<Category> findByInArchive(@RequestBody @Valid FindCategoryListRequest request) {
        return categoryService.findList(request.getInArchive());
    }

    /**
     * Установить флаг toArchive
     *
     * @param request запрос
     * @return сообщение об успешном перемещении в архив
     */
    @PostMapping("/set-in-archive")
    public String setInArchive(@RequestBody @Valid SetCategoryInArchiveRequest request) {
        categoryService.setToArchiveByName(request.getName(), request.inArchive);

        return String.format(CATEGORY_REMOVED_SUCCESSFULLY, request.getName());
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
