package org.panyukovnn.lifemanager.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * Основные настройки приложения.
 */
@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "life-manager")
public class LifeManagerProperties {

    private String frontUrl;
}
