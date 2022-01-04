package org.panyukovnn.lifemanager.repository;

import org.panyukovnn.lifemanager.model.user.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Репозиторий пользователей
 */
@Repository
public interface UserRepository extends MongoRepository<User, String> {
}
