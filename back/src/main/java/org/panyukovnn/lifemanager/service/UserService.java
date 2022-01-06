package org.panyukovnn.lifemanager.service;

import lombok.RequiredArgsConstructor;
import org.panyukovnn.lifemanager.exception.UserServiceException;
import org.panyukovnn.lifemanager.model.Constants;
import org.panyukovnn.lifemanager.model.user.User;
import org.panyukovnn.lifemanager.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import static org.panyukovnn.lifemanager.model.Constants.USER_ALREADY_EXISTS;
import static org.panyukovnn.lifemanager.model.Constants.USER_NOT_FOUND_ERROR;

/**
 * Сервис пользователей
 */
@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    /**
     * Регистрация пользователя
     *
     * @return зарегистрированный пользователь
     */
    public User signUp(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

        userRepository.findByUsernameIgnoreCase(user.getEmail())
                .ifPresent(u -> {
                    throw new UserServiceException(USER_ALREADY_EXISTS);
                });

        return userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsernameIgnoreCase(username)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_ERROR, username)));

        if (user.getActivationCode() != null) {
            throw new UserServiceException(String.format(Constants.USER_NOT_ACTIVATED, username));
        }

        return user;
    }
}
