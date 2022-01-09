package org.panyukovnn.lifemanager.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.panyukovnn.lifemanager.model.user.User;
import org.panyukovnn.lifemanager.repository.UserRepository;
import org.panyukovnn.lifemanager.service.LifeManagerUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

/**
 * Интеграционный тест контроллера пользователей
 */
@SpringBootTest
@AutoConfigureMockMvc
public class AuthControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private AuthController authController;

    @MockBean
    private LifeManagerUserDetailService lifeManagerUserDetailService;
    @MockBean
    private UserRepository userRepository;

    @Test
    public void should_returnBadRequest_when_passwordTooShort() throws Exception {
        User user = new User();
        user.setUsername("bob");
        user.setEmail("bob@domain.com");
        user.setPassword("123");

        String body = objectMapper.writer().writeValueAsString(user);

        mockMvc.perform(MockMvcRequestBuilders.post("/sign-up")
                .content(body)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isBadRequest())
                .andDo(print());
    }
}
