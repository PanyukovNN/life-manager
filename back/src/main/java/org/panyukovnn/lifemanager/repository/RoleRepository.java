package org.panyukovnn.lifemanager.repository;

import org.panyukovnn.lifemanager.model.user.Role;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Репозиторий ролей.
 */
@Repository
public interface RoleRepository extends MongoRepository<Role, String> {
}
