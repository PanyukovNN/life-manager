package org.panyukovnn.lifemanager.repository;

import org.panyukovnn.lifemanager.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Репозиторий задач.
 */
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    /**
     * Вернуть список задач по идентификатору.
     *
     * @param ids список идентификаторов
     */
    List<Task> findByIdIn(List<Long> ids);

    /**
     * Вернуть список задач по идентификатору категории.
     *
     * @param categoryId идентификатор категории
     */
    List<Task> findByCategoryId(Long categoryId);
}
