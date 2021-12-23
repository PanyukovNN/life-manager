package org.panyukovnn.lifemanager.service;

import lombok.RequiredArgsConstructor;
import org.panyukovnn.lifemanager.model.user.User;
import org.panyukovnn.lifemanager.repository.UserRepository;
import org.springframework.stereotype.Service;

/**
 * Сервис пользователей
 */
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    /**
     * Создать/обновить пользователя
     *
     * @return созданный/обновленный пользователь
     */
    public User createUpdateUser(User user) {
        return userRepository.save(user);
    }
}
