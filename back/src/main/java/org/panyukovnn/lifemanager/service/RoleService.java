package org.panyukovnn.lifemanager.service;

import com.google.common.collect.ImmutableMap;
import lombok.RequiredArgsConstructor;
import org.panyukovnn.lifemanager.model.user.Role;
import org.panyukovnn.lifemanager.model.user.RoleName;
import org.panyukovnn.lifemanager.repository.RoleRepository;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.validation.constraints.NotNull;
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
    private static final Map<RoleName, String> eng2RusRoleName = new ImmutableMap.Builder<RoleName, String>()
            .put(RoleName.ADMIN, "Администратор")
            .put(RoleName.USER, "Пользователь")
            .build();

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
     * Возвращает сущность роли по её наименовании.
     *
     * @param roleName наименование роли
     * @return сущность роли
     */
    public Role findByRoleName(RoleName roleName) {
        return roleCache.get(roleName);
    }

    /**
     * Получить название роли на русском языке.
     * Если значения на русском языке отсутствует - возвращает на английском языке.
     *
     * @param role роль
     * @return наименование роли на русском языке
     */
    public String getRusName(@NotNull Role role) {
        RoleName roleName = RoleName.valueOf(role.getName());

        return eng2RusRoleName.getOrDefault(roleName, roleName.name());
    }
}
