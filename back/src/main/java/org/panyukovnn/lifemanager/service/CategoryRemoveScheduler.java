package org.panyukovnn.lifemanager.service;

import lombok.RequiredArgsConstructor;
import org.panyukovnn.lifemanager.model.Category;
import org.panyukovnn.lifemanager.properties.LifeManagerProperties;
import org.panyukovnn.lifemanager.repository.CategoryRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Шедулер для окончательного удаления недавно удаленных категорий
 */
@Service
@RequiredArgsConstructor
public class CategoryRemoveScheduler {

    private final CategoryService categoryService;
    private final CategoryRepository categoryRepository;
    private final LifeManagerProperties lifeManagerProperties;

    @Scheduled(fixedRate = 24 * 60 * 60 * 1000)
    public void removeRecentlyDeleted() {
        List<Category> categories = categoryRepository.findByRecentlyDeletedIsTrueAndDeletionDateTimeIsBefore(
                LocalDateTime.now().minusDays(lifeManagerProperties.getKeepRecentlyDeletedCategoriesDays())
        );

        categoryService.deleteAll(categories);
    }
}
