package com.example.demo;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class Tests {

    // @Mock
    // private VolunteerService volunteerService;

    // @InjectMocks
    // private VolunteerController volunteerController;

    // private List<Volunteer> testVolunteers;

    // @BeforeEach
    // public void setUp() {
    // // Initialize test volunteers
    // testVolunteers = new ArrayList<>();
    // testVolunteers.add(new Volunteer(1, "Deni", "Toarcas", 25, "a@a.a",
    // "123456789", "Zalau", "Computer Science"));
    // testVolunteers.add(new Volunteer(2, "Razvan", "Atanasov", 30, "b@b.b",
    // "987654321", "Nicaieri", "Mathematics"));
    // }

    // @Test
    // public void testGetAllVolunteers() {
    // when(volunteerService.getAllVolunteers()).thenReturn(testVolunteers);

    // ResponseEntity<List<Volunteer>> response =
    // volunteerController.getAllVolunteers();

    // assertEquals(HttpStatus.OK, response.getStatusCode());
    // assertEquals(testVolunteers, response.getBody());
    // verify(volunteerService, times(1)).getAllVolunteers();
    // }

    // @Test
    // public void testGetVolunteerById() {
    // int id = 1;
    // Volunteer expectedVolunteer = testVolunteers.get(0);
    // when(volunteerService.getVolunteerById(id)).thenReturn(expectedVolunteer);

    // ResponseEntity<Volunteer> response =
    // volunteerController.getVolunteerById(id);

    // assertEquals(HttpStatus.OK, response.getStatusCode());
    // assertEquals(expectedVolunteer, response.getBody());
    // verify(volunteerService, times(1)).getVolunteerById(id);
    // }

    // @Test
    // public void testCreateVolunteer() {
    // Volunteer newVolunteer = new Volunteer(3, "Silviu", "Preoteasa", 28, "c@c.c",
    // "192837465", "Undeva",
    // "Mathematic and Computer Science");
    // when(volunteerService.createVolunteer(any(Volunteer.class))).thenReturn(newVolunteer);

    // ResponseEntity<Volunteer> response =
    // volunteerController.createVolunteer(newVolunteer);

    // assertEquals(HttpStatus.CREATED, response.getStatusCode());
    // assertEquals(newVolunteer, response.getBody());
    // verify(volunteerService, times(1)).createVolunteer(newVolunteer);
    // }

    // @Test
    // public void testUpdateVolunteer() {
    // int id = 1;
    // Volunteer updatedVolunteer = new Volunteer(1, "Deni", "Toarcas", 26, "a@a.a",
    // "123456789", "Zalau",
    // "Computer Science");
    // when(volunteerService.updateVolunteer(eq(id),
    // any(Volunteer.class))).thenReturn(updatedVolunteer);

    // ResponseEntity<Volunteer> response = volunteerController.updateVolunteer(id,
    // updatedVolunteer);

    // assertEquals(HttpStatus.OK, response.getStatusCode());
    // assertEquals(updatedVolunteer, response.getBody());
    // verify(volunteerService, times(1)).updateVolunteer(id, updatedVolunteer);
    // }

    // @Test
    // public void testDeleteVolunteer() {
    // int id = 1;
    // doNothing().when(volunteerService).deleteVolunteer(id);

    // ResponseEntity<Void> response = volunteerController.deleteVolunteer(id);

    // assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    // verify(volunteerService, times(1)).deleteVolunteer(id);
    // }

    // @Test
    // public void testGetVolunteerById_NotFound() {
    // int id = 100;
    // when(volunteerService.getVolunteerById(id)).thenReturn(null);

    // ResponseEntity<Volunteer> response =
    // volunteerController.getVolunteerById(id);

    // assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    // verify(volunteerService, times(1)).getVolunteerById(id);
    // }

    // @Test
    // public void testUpdateVolunteer_NotFound() {
    // int id = 100;
    // Volunteer updatedVolunteer = new Volunteer(100, "Deni", "Toarcas", 26,
    // "a@a.a", "123456789", "Zalau",
    // "Computer Science");
    // when(volunteerService.updateVolunteer(eq(id),
    // any(Volunteer.class))).thenReturn(null);

    // ResponseEntity<Volunteer> response = volunteerController.updateVolunteer(id,
    // updatedVolunteer);

    // assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    // verify(volunteerService, times(1)).updateVolunteer(id, updatedVolunteer);
    // }

    // @Test
    // public void testDeleteVolunteer_NotFound() {
    // int id = 100;
    // doThrow(new
    // IllegalArgumentException()).when(volunteerService).deleteVolunteer(id);

    // // Expect an IllegalArgumentException to be thrown
    // assertThrows(IllegalArgumentException.class, () ->
    // volunteerController.deleteVolunteer(id));
    // }

}
