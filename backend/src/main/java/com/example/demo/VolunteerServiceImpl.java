package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class VolunteerServiceImpl implements VolunteerService {

    private final VolunteerRepository volunteerRepository;

    @Autowired
    public VolunteerServiceImpl(VolunteerRepository volunteerRepository) {
        this.volunteerRepository = volunteerRepository;
    }

    @Override
    public List<Volunteer> getAllVolunteers() {
        return volunteerRepository.findAll();
    }

    @Override
    public Volunteer getVolunteerById(int id) {
        return volunteerRepository.findById(id).orElse(null);
    }

    @Override
    public Volunteer createVolunteer(Volunteer volunteer) {
        return volunteerRepository.save(volunteer);
    }

    @Override
    public Volunteer updateVolunteer(int id, Volunteer updatedVolunteer) {
        return volunteerRepository.findById(id)
                .map(volunteer -> {
                    volunteer.setFirstName(updatedVolunteer.getFirstName());
                    volunteer.setLastName(updatedVolunteer.getLastName());
                    volunteer.setAge(updatedVolunteer.getAge());
                    volunteer.setEmail(updatedVolunteer.getEmail());
                    volunteer.setPhone(updatedVolunteer.getPhone());
                    volunteer.setAddress(updatedVolunteer.getAddress());
                    volunteer.setFaculty(updatedVolunteer.getFaculty());
                    return volunteerRepository.save(volunteer);
                })
                .orElse(null);
    }

    @Override
    public void deleteVolunteer(int id) {
        volunteerRepository.deleteById(id);
    }

}
