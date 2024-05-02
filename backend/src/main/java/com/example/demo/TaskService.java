package com.example.demo;

import java.util.List;

import org.springframework.stereotype.Component;

@Component
public interface TaskService {
    List<Task> getAllTasks();

    Task getTaskById(int id);

    Task createTask(Task task);

    Task updateTask(int id, Task task);

    void deleteTask(int id);
}
