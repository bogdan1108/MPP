package com.example.demo;

import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Service
public class TaskServiceImpl implements TaskService {
    private final Map<Integer, Task> tasks = new HashMap<>();
    private int nextId = 1;

    @Override
    public List<Task> getAllTasks() {
        return new ArrayList<>(tasks.values());
    }

    @Override
    public Task getTaskById(int id) {
        return tasks.get(id);
    }

    @Override
    public Task createTask(Task task) {
        task.setId(nextId++);
        tasks.put(task.getId(), task);
        return task;
    }

    @Override
    public Task updateTask(int id, Task updatedTask) {
        if (tasks.containsKey(id)) {
            updatedTask.setId(id);
            tasks.put(id, updatedTask);
            return updatedTask;
        }
        return null; // Task not found
    }

    @Override
    public void deleteTask(int id) {
        tasks.remove(id);
    }
}
