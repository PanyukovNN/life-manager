package org.panyukovnn.lifemanager.service;

import lombok.RequiredArgsConstructor;
import org.panyukovnn.lifemanager.model.user.Role;
import org.panyukovnn.lifemanager.model.user.RoleName;
import org.panyukovnn.lifemanager.repository.RoleRepository;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

/**
 * Сервис ролей.
 */
@Service
@RequiredArgsConstructor
public class RoleService {

    private static final Map<RoleName, Role> roleCache = new EnumMap<>(RoleName.class);

    private final RoleRepository roleRepository;

    /**
     * Загружаем роли в кэш.
     */
    @PostConstruct
    private void postConstruct() {
        List<Role> allRoles = roleRepository.findAll();

        allRoles.forEach(role -> roleCache.put(RoleName.valueOf(role.getName()), role));
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
