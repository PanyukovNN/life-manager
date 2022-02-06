package org.panyukovnn.lifemanager.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.panyukovnn.lifemanager.exception.AuthException;
import org.panyukovnn.lifemanager.exception.NotFoundException;
import org.panyukovnn.lifemanager.model.user.RoleName;
import org.panyukovnn.lifemanager.model.user.SignInResult;
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
import static org.panyukovnn.lifemanager.model.Constants.USER_NOT_FOUND_ERROR;

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
        checkUserExistence(userTemplate);

        userTemplate.setPassword(bCryptPasswordEncoder.encode(userTemplate.getPassword()));
        userTemplate.setRoles(Set.of(roleService.findByRoleName(RoleName.USER)));
        userTemplate.setCreationDate(LocalDate.now(timeZone.toZoneId()));
        //TODO подтверждение по email
        userTemplate.setActivationCode(null);

        userRepository.save(userTemplate);
    }

    /**
     * Провести аутентификацию пользователя.
     *
     * @param email почтовый ящик
     * @param password пароль
     * @param timeZone частовой пояс пользователя
     * @return результат аутентификации пользователя
     */
    public SignInResult signIn(String email, String password, TimeZone timeZone) {
        String username = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_ERROR))
                .getUsername();

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password);
        Authentication authentication = authenticationManager.authenticate(authToken);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = (User) authentication.getPrincipal();
        String jwt = generateToken(user.getEmail(), timeZone);

        return SignInResult.builder()
                .user(user)
                .jwt(jwt)
                .build();
    }

    /**
     * Сгенерировать токен пользователя.
     *
     * @param email почтовый ящик
     * @param timeZone часовой пояс пользователя
     * @return JWT токен
     */
    private String generateToken(String email, TimeZone timeZone) {
        Date date = Date.from(LocalDate.now().plusDays(15).atStartOfDay(timeZone.toZoneId()).toInstant());

        return Jwts.builder()
                .setSubject(email)
                .setExpiration(date)
                .signWith(SignatureAlgorithm.HS512, jwtProperties.getSecret())
                .compact();
    }

    /**
     * Выбрасываем исключение, если пользователь с email'ом уже зарегистрирован.
     *
     * @param userTemplate частично заполенная сущность пользователя
     */
    private void checkUserExistence(User userTemplate) {
        boolean existsByEmail = userRepository.existsByEmailIgnoreCase(userTemplate.getEmail());
        if (existsByEmail) {
            throw new AuthException(USER_ALREADY_EXISTS_BY_EMAIL);
        }
    }
}
