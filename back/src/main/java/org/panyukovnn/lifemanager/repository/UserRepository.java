package org.panyukovnn.lifemanager.repository;

import org.panyukovnn.lifemanager.model.user.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Репозиторий пользователей.
 */
@Repository
public interface UserRepository extends MongoRepository<User, String> {

    /**
     * Находит пользователя по имени (без учета регистра).
     *
     * @param username имя пользователя
     * @return пользователь
     */
    Optional<User> findByUsernameIgnoreCase(String username);

    /**
     * Существует ли пользовать с данным email (без учета регистра).
     *
     * @param email почта пользователя
     * @return существует ли пользователья
     */
    Boolean existsByEmailIgnoreCase(String email);
}
