package org.panyukovnn.lifemanager.controller;

import lombok.RequiredArgsConstructor;
import org.panyukovnn.lifemanager.exception.NotFoundException;
import org.panyukovnn.lifemanager.model.Category;
import org.panyukovnn.lifemanager.model.request.*;
import org.panyukovnn.lifemanager.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

import static org.panyukovnn.lifemanager.model.Constants.*;

/**
 * Контроллер категорий.
 */
@CrossOrigin
@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    /**
     * Создать/обновить категорию.
     *
     * @param request запрос
     * @return сообщение об успешном сохранении/обновлении задачи
     */
    @PostMapping("/create-update")
    public String createUpdateCategory(@RequestBody CreateUpdateCategoryRequest request) {
        Category categoryTemplate = new Category();
        categoryTemplate.setId(request.getId());
        categoryTemplate.setName(request.getName());

        categoryService.createUpdate(categoryTemplate);

        return String.format(CATEGORY_CREATED_UPDATED_SUCCESSFULLY, request.getName());
    }

    /**
     * Найти категорию по наименованию.
     *
     * @param request запрос
     * @return категория
     */
    @GetMapping("/find-by-name")
    public Category findByName(@RequestBody @Valid FindCategoryByNameRequest request) {
        return categoryService.findByName(request.getName())
                .orElseThrow(() -> new NotFoundException(CATEGORY_NOT_FOUND_ERROR_MSG));
    }

    /**
     * Вернуть все категории по флагу inArchive.
     *
     * @param request запрос
     * @return список категорий
     */
    @PostMapping("/find-list")
    public List<Category> findByInArchive(@RequestBody @Valid FindCategoryListRequest request) {
        return categoryService.findList(request.getInArchive());
    }

    /**
     * Установить флаг toArchive.
     *
     * @param request запрос
     * @return сообщение об успешном перемещении в архив
     */
    @PostMapping("/set-in-archive")
    public String setInArchive(@RequestBody @Valid SetCategoryInArchiveRequest request) {
        categoryService.setToArchiveByName(request.getName(), request.isInArchive());

        return String.format(CATEGORY_SET_IN_ARCHIVE_SUCCESSFULLY, request.getName());
    }

    /**
     * Удалить категорию по имени.
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
