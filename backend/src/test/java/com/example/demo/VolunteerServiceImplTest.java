package com.example.demo;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.*;

class VolunteerServiceImplTest {

    // @Mock
    // private VolunteerRepository volunteerRepository;

    // @InjectMocks
    // private VolunteerServiceImpl volunteerService;

    // @BeforeEach
    // void setUp() {
    // MockitoAnnotations.openMocks(this);
    // }

    // @Test
    // void testGetAllVolunteers_WhenNoVolunteersExist_ReturnsEmptyList() {
    // // Arrange
    // when(volunteerRepository.findAll()).thenReturn(Collections.emptyList());

    // // Act
    // List<Volunteer> result = volunteerService.getAllVolunteers();

    // // Assert
    // assertTrue(result.isEmpty());
    // }

    // @Test
    // void testGetVolunteerById_WhenVolunteerExists_ReturnsVolunteer() {
    // // Arrange
    // Volunteer volunteer = new Volunteer(1, "John", "Doe", 25, "john@example.com",
    // "123456789", "123 Street",
    // "Engineering");
    // when(volunteerRepository.findById(1)).thenReturn(Optional.of(volunteer));

    // // Act
    // Volunteer result = volunteerService.getVolunteerById(1);

    // // Assert
    // assertNotNull(result);
    // assertEquals(volunteer, result);
    // }

    // @Test
    // void testGetVolunteerById_WhenVolunteerDoesNotExist_ReturnsNull() {
    // // Arrange
    // when(volunteerRepository.findById(1)).thenReturn(Optional.empty());

    // // Act
    // Volunteer result = volunteerService.getVolunteerById(1);

    // // Assert
    // assertNull(result);
    // }

    // @Test
    // void testCreateVolunteer_ReturnsCreatedVolunteerWithIncrementedId() {
    // // Arrange
    // Volunteer volunteer = new Volunteer(0, "John", "Doe", 25, "john@example.com",
    // "123456789", "123 Street",
    // "Engineering");
    // when(volunteerRepository.save(volunteer))
    // .thenReturn(new Volunteer(1, volunteer.getFirstName(),
    // volunteer.getLastName(),
    // volunteer.getAge(), volunteer.getEmail(), volunteer.getPhone(),
    // volunteer.getAddress(),
    // volunteer.getFaculty()));

    // // Act
    // Volunteer result = volunteerService.createVolunteer(volunteer);

    // // Assert
    // assertNotNull(result);
    // assertEquals(1, result.getId());
    // }

    // @Test
    // void testUpdateVolunteer_WhenVolunteerExists_ReturnsUpdatedVolunteer() {
    // // Arrange
    // Volunteer existingVolunteer = new Volunteer(1, "John", "Doe", 25,
    // "john@example.com", "123456789", "123 Street",
    // "Engineering");
    // when(volunteerRepository.existsById(1)).thenReturn(true);
    // when(volunteerRepository.save(existingVolunteer)).thenReturn(existingVolunteer);

    // Volunteer updatedVolunteer = new Volunteer(1, "Jane", "Doe", 30,
    // "jane@example.com", "987654321", "456 Avenue",
    // "Medicine");

    // // Act
    // Volunteer result = volunteerService.updateVolunteer(1, updatedVolunteer);

    // // Assert
    // assertNotNull(result);
    // assertEquals(updatedVolunteer, result);
    // }

    // @Test
    // void testUpdateVolunteer_WhenVolunteerDoesNotExist_ReturnsNull() {
    // // Arrange
    // when(volunteerRepository.existsById(1)).thenReturn(false);

    // // Act
    // Volunteer result = volunteerService.updateVolunteer(1, new Volunteer());

    // // Assert
    // assertNull(result);
    // }

    // @Test
    // void testDeleteVolunteer_WhenVolunteerExists_RemovesVolunteer() {
    // // Arrange
    // Volunteer volunteer = new Volunteer(1, "John", "Doe", 25, "john@example.com",
    // "123456789", "123 Street",
    // "Engineering");
    // when(volunteerRepository.existsById(1)).thenReturn(true);

    // // Act
    // volunteerService.deleteVolunteer(1);

    // // Assert
    // verify(volunteerRepository, times(1)).deleteById(1);
    // }

    // @Test
    // void
    // testDeleteVolunteer_WhenVolunteerDoesNotExist_NoInteractionWithRepository() {
    // // Arrange
    // when(volunteerRepository.existsById(1)).thenReturn(false);

    // // Act
    // volunteerService.deleteVolunteer(1);

    // // Assert
    // verify(volunteerRepository, never()).deleteById(1);
    // }

    // @Test
    // void
    // testGetAllVolunteersSorted_WhenSortingByFirstNameAscending_ReturnsSortedVolunteersByFirstNameAscending()
    // {
    // // Arrange
    // Volunteer volunteer1 = new Volunteer(1, "John", "Doe", 25,
    // "john@example.com", "123456789", "123 Street",
    // "Engineering");
    // Volunteer volunteer2 = new Volunteer(2, "Alice", "Smith", 30,
    // "alice@example.com", "987654321", "456 Avenue",
    // "Medicine");
    // List<Volunteer> expectedVolunteers = Arrays.asList(volunteer2, volunteer1);
    // when(volunteerRepository.findAll()).thenReturn(Arrays.asList(volunteer1,
    // volunteer2));

    // // Act
    // List<Volunteer> result = volunteerService.getAllVolunteersSorted("firstName",
    // "asc");

    // // Assert
    // assertEquals(expectedVolunteers, result);
    // }

    // @Test
    // void
    // testGetPaginatedVolunteers_WhenPageIsOneAndPageSizeIsTwo_ReturnsFirstTwoVolunteers()
    // {
    // // Arrange
    // Volunteer volunteer1 = new Volunteer(1, "John", "Doe", 25,
    // "john@example.com", "123456789", "123 Street",
    // "Engineering");
    // Volunteer volunteer2 = new Volunteer(2, "Alice", "Smith", 30,
    // "alice@example.com", "987654321", "456 Avenue",
    // "Medicine");
    // Volunteer volunteer3 = new Volunteer(3, "Bob", "Johnson", 28,
    // "bob@example.com", "456789123", "789 Boulevard",
    // "Science");
    // when(volunteerRepository.findAll()).thenReturn(Arrays.asList(volunteer1,
    // volunteer2, volunteer3));
    // List<Volunteer> expectedVolunteers = Arrays.asList(volunteer1, volunteer2);

    // // Act
    // List<Volunteer> result = volunteerService.getPaginatedVolunteers(1, 2);

    // // Assert
    // assertEquals(expectedVolunteers, result);
    // }

    // @Test
    // void
    // testGetPaginatedVolunteers_WhenPageIsTwoAndPageSizeIsTwo_ReturnsNextTwoVolunteers()
    // {
    // // Arrange
    // Volunteer volunteer1 = new Volunteer(1, "John", "Doe", 25,
    // "john@example.com", "123456789", "123 Street",
    // "Engineering");
    // Volunteer volunteer2 = new Volunteer(2, "Alice", "Smith", 30,
    // "alice@example.com", "987654321", "456 Avenue",
    // "Medicine");
    // Volunteer volunteer3 = new Volunteer(3, "Bob", "Johnson", 28,
    // "bob@example.com", "456789123", "789 Boulevard",
    // "Science");
    // when(volunteerRepository.findAll()).thenReturn(Arrays.asList(volunteer1,
    // volunteer2, volunteer3));
    // List<Volunteer> expectedVolunteers = Collections.singletonList(volunteer3);

    // // Act
    // List<Volunteer> result = volunteerService.getPaginatedVolunteers(2, 2);

    // // Assert
    // assertEquals(expectedVolunteers, result);
    // }
}
