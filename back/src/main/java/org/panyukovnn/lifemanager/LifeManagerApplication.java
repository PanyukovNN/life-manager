package org.panyukovnn.lifemanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableSwagger2
@EnableMongoRepositories(basePackages = "org.panyukovnn.lifemanager.repository")
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class}, scanBasePackages = {"org.panyukovnn.lifemanager"})
public class LifeManagerApplication {

    public static void main(String[] args) {
        SpringApplication.run(LifeManagerApplication.class);
    }
}
