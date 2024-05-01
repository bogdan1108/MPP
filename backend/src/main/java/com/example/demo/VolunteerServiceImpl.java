package com.example.demo;

import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

@Service
public class VolunteerServiceImpl implements VolunteerService {

    private final Map<Integer, Volunteer> volunteers = new HashMap<>();
    private int nextId = 1;

    @Override
    public List<Volunteer> getAllVolunteers() {
        return new ArrayList<>(volunteers.values());
    }

    @Override
    public Volunteer getVolunteerById(int id) {
        return volunteers.get(id);
    }

    @Override
    public Volunteer createVolunteer(Volunteer volunteer) {
        volunteer.setId(nextId++);
        volunteers.put(volunteer.getId(), volunteer);
        return volunteer;
    }

    @Override
    public Volunteer updateVolunteer(int id, Volunteer updatedVolunteer) {
        if (volunteers.containsKey(id)) {
            updatedVolunteer.setId(id);
            volunteers.put(id, updatedVolunteer);
            return updatedVolunteer;
        }
        return null; // Volunteer not found
    }

    @Override
    public void deleteVolunteer(int id) {
        volunteers.remove(id);
    }

    @Override
    public List<Volunteer> getAllVolunteersSorted(String sortBy, String sortOrder) {
        Comparator<Volunteer> comparator = Comparator.comparing(Volunteer::getId); // Default sorting by id
        if ("firstName".equalsIgnoreCase(sortBy)) {
            comparator = Comparator.comparing(Volunteer::getFirstName);
        } else if ("lastName".equalsIgnoreCase(sortBy)) {
            comparator = Comparator.comparing(Volunteer::getLastName);
        }
        if ("desc".equalsIgnoreCase(sortOrder)) {
            comparator = comparator.reversed();
        }
        return volunteers.values().stream()
                .sorted(comparator)
                .collect(Collectors.toList());
    }

    @Override
    public List<Volunteer> getPaginatedVolunteers(int page, int pageSize) {
        int fromIndex = (page - 1) * pageSize;
        int toIndex = Math.min(fromIndex + pageSize, volunteers.size());
        return new ArrayList<>(volunteers.values()).subList(fromIndex, toIndex);
    }
}
