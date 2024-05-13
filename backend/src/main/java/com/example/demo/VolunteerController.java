package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/volunteers")
public class VolunteerController {

    private final VolunteerService volunteerService;
    private final SocketService socketService; // Define the SocketService field

    @Autowired
    public VolunteerController(VolunteerService volunteerService, SocketService socketService) {
        this.volunteerService = volunteerService;
        this.socketService = socketService;
    }

    @GetMapping
    public ResponseEntity<List<Volunteer>> getAllVolunteers() {
        List<Volunteer> volunteers = volunteerService.getAllVolunteers();
        return ResponseEntity.ok(volunteers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Volunteer> getVolunteerById(@PathVariable int id) {
        Volunteer volunteer = volunteerService.getVolunteerById(id);
        if (volunteer != null) {
            return ResponseEntity.ok(volunteer);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Volunteer> createVolunteer(@RequestBody Volunteer volunteer) {
        Volunteer createdVolunteer = volunteerService.createVolunteer(volunteer);
        socketService.broadcastVolunteerCreated(createdVolunteer); // Now socketService is recognized
        return new ResponseEntity<>(createdVolunteer, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Volunteer> updateVolunteer(@PathVariable int id, @RequestBody Volunteer volunteer) {
        Volunteer updatedVolunteer = volunteerService.updateVolunteer(id, volunteer);
        if (updatedVolunteer != null) {
            return ResponseEntity.ok(updatedVolunteer);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVolunteer(@PathVariable int id) {
        volunteerService.deleteVolunteer(id);
        return ResponseEntity.noContent().build();
    }
}
