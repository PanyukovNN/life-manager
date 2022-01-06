package org.panyukovnn.lifemanager.service;

import lombok.AllArgsConstructor;
import org.panyukovnn.lifemanager.model.user.Role;
import org.panyukovnn.lifemanager.repository.RoleRepository;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;

/**
 * Сервис ролей
 */
@Service
@AllArgsConstructor
public class RoleService {

    private static final String ADMIN = "ADMIN";
    private static final String USER = "USER";
    private static final List<Role> roles = List.of(
            new Role(ADMIN),
            new Role(USER)
    );

    private final RoleRepository roleRepository;

    /**
     * Создаем роли, которых нет в базе данных
     */
    @PostConstruct
    private void postConstruct() {
        List<Role> allRoles = roleRepository.findAll();

        roles.forEach(
                role -> {
                    boolean roleDoesNotExists = allRoles
                            .stream()
                            .noneMatch(ar -> ar.getName().equals(role.getName()));
                    if (roleDoesNotExists) {
                        roleRepository.save(role);
                    }
                });
    }

    // TODO добавить кэширование
    public Role getAdminRole() {
        return roleRepository.findByName(ADMIN);
    }

    public Role getUserRole() {
        return roleRepository.findByName(USER);
    }
}
