package org.panyukovnn.lifemanager.controller;

import lombok.RequiredArgsConstructor;
import org.panyukovnn.lifemanager.model.request.AuthRequest;
import org.panyukovnn.lifemanager.model.response.AuthResponse;
import org.panyukovnn.lifemanager.model.user.User;
import org.panyukovnn.lifemanager.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import static org.panyukovnn.lifemanager.model.Constants.SING_UP_SUCCESSFUL;

/**
 * Контроллер пользователей
 */
@RestController("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /**
     * Регистрация пользователя
     *
     * @param user пользователь
     * @return сообщение об успешной регистрации
     */
    @PostMapping("/sign-up")
    public String signUp(@Valid @RequestBody User user) {
        userService.signUp(user);

        return SING_UP_SUCCESSFUL;
    }

    /**
     * Аутентификация пользователя
     *
     * @param request запрос на аутентификацию пользователя
     * @return ответ с токеном
     */
    @PostMapping("/auth")
    public ResponseEntity<AuthResponse> auth(@RequestBody @Valid AuthRequest request) {
        String jwtToken = userService.authenticateUser(request.getUsername(), request.getPassword());

        AuthResponse response = new AuthResponse(jwtToken);

        return ResponseEntity.ok(response);
    }
}
