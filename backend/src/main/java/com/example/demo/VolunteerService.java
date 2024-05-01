package com.example.demo;

import java.util.List;

public interface VolunteerService {
    List<Volunteer> getAllVolunteers();

    Volunteer getVolunteerById(int id);

    Volunteer createVolunteer(Volunteer volunteer);

    Volunteer updateVolunteer(int id, Volunteer volunteer);

    void deleteVolunteer(int id);

    List<Volunteer> getAllVolunteersSorted(String sortBy, String sortOrder);

    List<Volunteer> getPaginatedVolunteers(int page, int pageSize);
}
