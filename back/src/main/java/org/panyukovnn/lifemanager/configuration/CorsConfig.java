package org.panyukovnn.lifemanager.configuration;

import lombok.RequiredArgsConstructor;
import org.panyukovnn.lifemanager.properties.LifeManagerProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Cross origin конфигурация
 */
@Configuration
@RequiredArgsConstructor
public class CorsConfig implements WebMvcConfigurer {

    private final LifeManagerProperties lifeManagerProperties;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**");
//        registry.addMapping("/**")
//                .allowedOrigins(lifeManagerProperties.getFrontUrl())
//                .allowedHeaders("*")
//                .allowCredentials(true);
    }
}

