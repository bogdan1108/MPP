package com.example.demo;

import java.util.List;

import org.springframework.stereotype.Component;

@Component
public interface VolunteerService {

    List<Volunteer> getAllVolunteers();

    Volunteer getVolunteerById(int id);

    Volunteer createVolunteer(Volunteer volunteer);

    Volunteer updateVolunteer(int id, Volunteer volunteer);

    void deleteVolunteer(int id);
}
