package com.example.demo;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String description;
    @ManyToOne
    @JoinColumn(name = "volunteer_id")
    @JsonBackReference("taskVolunteers")
    private Volunteer volunteer;

    // Constructors, getters, and setters
    public Task() {
    }

    public Task(int id, String name, String description, Volunteer volunteer) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.volunteer = volunteer;
    }

    // Getters and setters for id, name, description, and volunteer
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Volunteer getVolunteer() {
        return volunteer;
    }

    public void setVolunteer(Volunteer volunteer) {
        this.volunteer = volunteer;
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", volunteer=" + volunteer +
                '}';
    }
}
