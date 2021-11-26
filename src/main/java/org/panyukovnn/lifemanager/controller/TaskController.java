package org.panyukovnn.lifemanager.controller;

import org.panyukovnn.lifemanager.model.Task;
import org.panyukovnn.lifemanager.model.request.CreateUpdateTaskRequest;
import org.panyukovnn.lifemanager.repository.TaskRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/task")
public class TaskController {

    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @PostMapping("/add")
    public Task addTask(@RequestBody CreateUpdateTaskRequest request) {
        Task task = new Task();
        task.setDescription(request.getDescription());
        task.setPriority(convertPriority(request.getPriority()));
        task.setCreationDateTime(LocalDateTime.now());

        taskRepository.save(task);

        return task;
    }

    @GetMapping("/find-all")
    public List<Task> findAll() {
        List<Task> allTasks = taskRepository.findAll();
        allTasks.sort(Collections.reverseOrder());

        return allTasks;
    }

    private int convertPriority(String priority) {
        char letter = priority.charAt(0);
        int multiplier = (4 - (letter - 'A')) * 4;

        return multiplier - Character.getNumericValue(priority.charAt(1));
    }
}
