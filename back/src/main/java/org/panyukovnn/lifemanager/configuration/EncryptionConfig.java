package org.panyukovnn.lifemanager.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Конфигурация шифрования.
 */
@Configuration
public class EncryptionConfig {

    /**
     * Бин шифрования паролей.
     *
     * @return реализация шифрователя паролей
     */
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(8);
    }
}
