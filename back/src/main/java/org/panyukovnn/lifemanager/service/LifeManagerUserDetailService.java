package org.panyukovnn.lifemanager.service;

import lombok.RequiredArgsConstructor;
import org.panyukovnn.lifemanager.exception.AuthUserDetailServiceException;
import org.panyukovnn.lifemanager.model.Constants;
import org.panyukovnn.lifemanager.model.user.User;
import org.panyukovnn.lifemanager.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import static org.panyukovnn.lifemanager.model.Constants.USER_NOT_FOUND_ERROR;

/**
 * Сервис пользователей.
 */
@Service
@RequiredArgsConstructor
public class LifeManagerUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsernameIgnoreCase(username)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_ERROR, username)));

        if (user.getActivationCode() != null) {
            throw new AuthUserDetailServiceException(String.format(Constants.USER_NOT_ACTIVATED, username));
        }

        return user;
    }
}
