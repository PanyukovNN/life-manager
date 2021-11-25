package org.panyukovnn.lifemanager;

import org.panyukovnn.lifemanager.controller.TaskController;
import org.panyukovnn.lifemanager.model.request.AddTaskRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories(basePackages = "org.panyukovnn.lifemanager.repository")
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class}, scanBasePackages = {"org.panyukovnn.lifemanager"})
public class LifeManagerApplication implements CommandLineRunner {

    @Autowired
    TaskController taskController;

    public static void main(String[] args) {
        SpringApplication.run(LifeManagerApplication.class);
    }

    @Override
    public void run(String... args) throws Exception {
        AddTaskRequest request = new AddTaskRequest();
        request.setDescription("First task");
        request.setPriority("A4");

        taskController.addTask(request);
    }
}
