package org.panyukovnn.lifemanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableSwagger2
@EnableJpaRepositories(basePackages = "org.panyukovnn.lifemanager.repository")
@SpringBootApplication(scanBasePackages = {"org.panyukovnn.lifemanager"})
public class LifeManagerApplication {

    public static void main(String[] args) {
        SpringApplication.run(LifeManagerApplication.class);
    }
}
