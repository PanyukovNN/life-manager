package org.panyukovnn.lifemanager.controller;

import org.panyukovnn.lifemanager.model.Task;
import org.panyukovnn.lifemanager.model.request.CreateUpdateTaskRequest;
import org.panyukovnn.lifemanager.repository.CategoryRepository;
import org.panyukovnn.lifemanager.repository.TaskRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/task")
public class CategoryController {

    private final CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
}
