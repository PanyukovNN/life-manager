package org.panyukovnn.lifemanager.controller;

import lombok.RequiredArgsConstructor;
import org.panyukovnn.lifemanager.model.user.User;
import org.panyukovnn.lifemanager.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * Контроллер пользователей
 */
@RestController("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/sign-up")
    public String createUpdateUser(@Valid @RequestBody User user) {
        userService.createUpdateUser(user);

        return "Пользователь успешно создан/обновлен.";
    }
}
