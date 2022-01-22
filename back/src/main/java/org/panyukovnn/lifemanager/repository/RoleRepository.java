package org.panyukovnn.lifemanager.repository;

import org.panyukovnn.lifemanager.model.user.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Репозиторий ролей.
 */
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
}
