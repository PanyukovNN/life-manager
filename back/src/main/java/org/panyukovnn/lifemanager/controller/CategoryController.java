package org.panyukovnn.lifemanager.controller;

import lombok.RequiredArgsConstructor;
import org.panyukovnn.lifemanager.exception.NotFoundException;
import org.panyukovnn.lifemanager.model.Category;
import org.panyukovnn.lifemanager.model.request.*;
import org.panyukovnn.lifemanager.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.TimeZone;

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
     * Вернуть все категории переданным параметрам.
     *
     * @param request запрос
     * @return список категорий
     */
    @PostMapping("/find-list")
    public List<Category> findList(@RequestBody @Valid FindCategoryListRequest request) {
        return categoryService.findList(request.getRecentlyDeleted());
    }

    /**
     * Поместить категорию в недавно удаленные.
     *
     * @param request запрос
     * @param timeZone часовой пояс клиента
     * @return сообщение об успешном перемещении в 'недавно удаленные'
     */
    @PostMapping("/move-to-recently-deleted")
    public String moveToRecentlyDeleted(@RequestBody @Valid CategoryNameRequest request, TimeZone timeZone) {
        categoryService.moveToRecentlyDeleted(request.getName(), timeZone);

        return String.format(CATEGORY_MOVED_TO_RECENTLY_DELETED_SUCCESSFULLY, request.getName());
    }

    /**
     * Восстановить категорию из недавно удаленных.
     *
     * @param request запрос
     * @return сообщение об успешном восстановлении из недавно удаленных
     */
    @PostMapping("/recover-from-recently-deleted")
    public String recoverFromRecentlyDeleted(@RequestBody @Valid CategoryNameRequest request) {
        categoryService.recoverFromRecentlyDeleted(request.getName());

        return String.format(CATEGORY_RECOVERED_FROM_RECENTLY_DELETED_SUCCESSFULLY, request.getName());
    }

    /**
     * Окончательно удалить категорию по имени.
     *
     * @param request запрос
     * @return сообщение об успешном удалении
     */
    @DeleteMapping("/delete-permanently-by-name")
    public String deletePermanentlyByName(@RequestBody @Valid CategoryNameRequest request) {
        categoryService.deleteByName(request.getName());

        return String.format(CATEGORY_REMOVED_SUCCESSFULLY, request.getName());
    }
}
