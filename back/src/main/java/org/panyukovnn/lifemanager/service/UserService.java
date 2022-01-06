package org.panyukovnn.lifemanager.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.panyukovnn.lifemanager.exception.UserServiceException;
import org.panyukovnn.lifemanager.model.Constants;
import org.panyukovnn.lifemanager.model.user.RoleName;
import org.panyukovnn.lifemanager.model.user.User;
import org.panyukovnn.lifemanager.properties.JWTProperties;
import org.panyukovnn.lifemanager.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.Set;

import static org.panyukovnn.lifemanager.model.Constants.USER_ALREADY_EXISTS;
import static org.panyukovnn.lifemanager.model.Constants.USER_NOT_FOUND_ERROR;

/**
 * Сервис пользователей
 */
@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final RoleService roleService;
    private final JWTProperties jwtProperties;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AuthenticationManager authenticationManager;

    /**
     * Регистрация пользователя
     *
     * @return зарегистрированный пользователь
     */
    public User signUp(User user) {
        userRepository.findByUsernameIgnoreCase(user.getEmail())
                .ifPresent(u -> {
                    throw new UserServiceException(USER_ALREADY_EXISTS);
                });

        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setRoles(Set.of(roleService.findByRoleName(RoleName.USER)));

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

    /**
     * Провести аутентификацию пользователя
     *
     * @param username имя пользователя
     * @param password пароль
     * @return jwt токен
     */
    public String authenticateUser(String username, String password) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password);
        Authentication authentication = authenticationManager.authenticate(authToken);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = (User) authentication.getPrincipal();

        return generateToken(user.getUsername());
    }

    /**
     * Сгенерировать токен пользователя
     *
     * @param username имя пользователя
     * @return JWT токен
     */
    private String generateToken(String username) {
        Date date = Date.from(LocalDate.now().plusDays(15).atStartOfDay(ZoneId.systemDefault()).toInstant());

        return Jwts.builder()
                .setSubject(username)
                .setExpiration(date)
                .signWith(SignatureAlgorithm.HS512, jwtProperties.getSecret())
                .compact();
    }
}
