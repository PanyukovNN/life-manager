package org.panyukovnn.lifemanager.service;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.panyukovnn.lifemanager.model.user.Role;
import org.panyukovnn.lifemanager.model.user.RoleName;
import org.panyukovnn.lifemanager.repository.RoleRepository;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Сервис ролей.
 */
@Service
@RequiredArgsConstructor
public class RoleService {

    private static final Map<RoleName, Role> roleCache = new HashMap<>();

    private final RoleRepository roleRepository;

    /**
     * Создаем роли, которых нет в базе данных и заполняем кеш.
     */
    @PostConstruct
    private void postConstruct() {
        List<Role> allRoles = roleRepository.findAll();

        Arrays.stream(RoleName.values()).forEach(roleName -> allRoles
                .stream()
                .filter(ar -> ar.getName().equals(roleName.name()))
                .findAny()
                .ifPresentOrElse(
                        role -> roleCache.put(roleName, role),
                        () -> {
                            Role savedRole = roleRepository.save(new Role(roleName.name()));
                            roleCache.put(roleName, savedRole);
                        }));
    }

    /**
     * Возвращает сущность роли по её имени.
     *
     * @param roleName имя роли
     * @return сущность роли
     */
    public Role findByRoleName(RoleName roleName) {
        return roleCache.get(roleName);
    }
}
