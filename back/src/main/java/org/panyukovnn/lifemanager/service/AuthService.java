package org.panyukovnn.lifemanager.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.panyukovnn.lifemanager.exception.AuthException;
import org.panyukovnn.lifemanager.model.user.RoleName;
import org.panyukovnn.lifemanager.model.user.User;
import org.panyukovnn.lifemanager.properties.JWTProperties;
import org.panyukovnn.lifemanager.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.Set;
import java.util.TimeZone;

import static org.panyukovnn.lifemanager.model.Constants.USER_ALREADY_EXISTS_BY_EMAIL;
import static org.panyukovnn.lifemanager.model.Constants.USER_ALREADY_EXISTS_BY_NAME;

/**
 * Сервис аутентификации.
 */
@Service
@RequiredArgsConstructor
public class AuthService {

    private final RoleService roleService;
    private final JWTProperties jwtProperties;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AuthenticationManager authenticationManager;

    /**
     * Регистрация пользователя.
     *
     * @param userTemplate частично заполненная сущность пользователя
     * @param timeZone частовой пояс пользователя
     */
    public void signUp(User userTemplate, TimeZone timeZone) {
        userRepository.findByUsernameIgnoreCase(userTemplate.getUsername())
                .ifPresent(u -> {
                    throw new AuthException(USER_ALREADY_EXISTS_BY_NAME);
                });

        boolean existsWithEmail = userRepository.existsByEmailIgnoreCase(userTemplate.getEmail());

        if (existsWithEmail) {
            throw new AuthException(USER_ALREADY_EXISTS_BY_EMAIL);
        }

        userTemplate.setPassword(bCryptPasswordEncoder.encode(userTemplate.getPassword()));
        userTemplate.setRoles(Set.of(roleService.findByRoleName(RoleName.USER)));
        userTemplate.setConfirmPassword(null);
        userTemplate.setCreationDate(LocalDate.now(timeZone.toZoneId()));
        //TODO подтверждение по email
        userTemplate.setActivationCode(null);

        userRepository.save(userTemplate);
    }

    /**
     * Провести аутентификацию пользователя.
     *
     * @param username имя пользователя
     * @param password пароль
     * @param timeZone частовой пояс пользователя
     * @return jwt токен
     */
    public String signIn(String username, String password, TimeZone timeZone) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password);
        Authentication authentication = authenticationManager.authenticate(authToken);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = (User) authentication.getPrincipal();

        return generateToken(user.getUsername(), timeZone);
    }

    /**
     * Сгенерировать токен пользователя.
     *
     * @param username имя пользователя
     * @param timeZone часовой пояс пользователя
     * @return JWT токен
     */
    private String generateToken(String username, TimeZone timeZone) {
        Date date = Date.from(LocalDate.now().plusDays(15).atStartOfDay(timeZone.toZoneId()).toInstant());

        return Jwts.builder()
                .setSubject(username)
                .setExpiration(date)
                .signWith(SignatureAlgorithm.HS512, jwtProperties.getSecret())
                .compact();
    }
}
