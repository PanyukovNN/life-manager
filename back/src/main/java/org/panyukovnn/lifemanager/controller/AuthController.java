package org.panyukovnn.lifemanager.controller;

import lombok.RequiredArgsConstructor;
import org.panyukovnn.lifemanager.model.request.AuthRequest;
import org.panyukovnn.lifemanager.model.request.UserSignUpRequest;
import org.panyukovnn.lifemanager.model.response.AuthResponse;
import org.panyukovnn.lifemanager.model.user.User;
import org.panyukovnn.lifemanager.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.TimeZone;

import static org.panyukovnn.lifemanager.model.Constants.SING_UP_SUCCESSFUL;

/**
 * Контроллер пользователей
 */
@CrossOrigin
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * Регистрация пользователя
     *
     * @param request запрос
     * @param timeZone частовой пояс пользователя
     * @return сообщение об успешной регистрации
     */
    @PostMapping("/sign-up")
    public String signUp(@Valid @RequestBody UserSignUpRequest request, TimeZone timeZone) {
        User user = new User();
        user.setId(request.getId());
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());

        authService.signUp(user, timeZone);

        return SING_UP_SUCCESSFUL;
    }

    /**
     * Аутентификация пользователя
     *
     * @param request запрос на аутентификацию пользователя
     * @param timeZone частовой пояс пользователя
     * @return ответ с токеном
     */
    @PostMapping("/sign-in")
    public ResponseEntity<AuthResponse> signIn(@RequestBody @Valid AuthRequest request, TimeZone timeZone) {
        String jwtToken = authService.signIn(request.getUsername(), request.getPassword(), timeZone);

        AuthResponse response = new AuthResponse(jwtToken);

        return ResponseEntity.ok(response);
    }
}
