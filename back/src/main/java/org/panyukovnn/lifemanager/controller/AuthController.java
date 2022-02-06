package org.panyukovnn.lifemanager.controller;

import lombok.RequiredArgsConstructor;
import org.panyukovnn.lifemanager.model.dto.UserDto;
import org.panyukovnn.lifemanager.model.request.AuthRequest;
import org.panyukovnn.lifemanager.model.request.UserSignUpRequest;
import org.panyukovnn.lifemanager.model.response.AuthResponse;
import org.panyukovnn.lifemanager.model.user.SignInResult;
import org.panyukovnn.lifemanager.model.user.User;
import org.panyukovnn.lifemanager.service.AuthService;
import org.panyukovnn.lifemanager.service.ControllerHelper;
import org.panyukovnn.lifemanager.service.RoleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.TimeZone;
import java.util.stream.Collectors;

import static org.panyukovnn.lifemanager.model.Constants.SING_UP_SUCCESSFUL;

/**
 * Контроллер пользователей.
 */
@CrossOrigin
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final RoleService roleService;

    /**
     * Регистрация пользователя.
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
     * Аутентификация пользователя.
     *
     * @param request запрос на аутентификацию пользователя
     * @param timeZone частовой пояс пользователя
     * @return ответ с токеном
     */
    @PostMapping("/sign-in")
    public ResponseEntity<AuthResponse> signIn(@RequestBody @Valid AuthRequest request, TimeZone timeZone) {
        SignInResult signInResult = authService.signIn(request.getEmail(), request.getPassword(), timeZone);

        User user = signInResult.getUser();

        List<String> rolesRusName = signInResult.getUser().getRoles().stream()
                .map(roleService::getRusName)
                .collect(Collectors.toList());

        UserDto userDto = UserDto.builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .creationDate(ControllerHelper.FRONT_D_FORMATTER.format(user.getCreationDate()))
                .roles(rolesRusName)
                .build();

        AuthResponse response = AuthResponse.builder()
                .userDto(userDto)
                .accessToken(signInResult.getJwt())
                .build();

        return ResponseEntity.ok(response);
    }
}
