package com.example.demo;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.lang.reflect.Field;
import java.util.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class VolunteerServiceImplTest {

    private VolunteerServiceImpl volunteerService;

    @BeforeEach
    void setUp() {
        volunteerService = new VolunteerServiceImpl();
    }

    @Test
    void testGetAllVolunteers_WhenNoVolunteersExist_ReturnsEmptyList() {
        // Arrange
        setField(volunteerService, "volunteers", new HashMap<>());

        // Act
        List<Volunteer> result = volunteerService.getAllVolunteers();

        // Assert
        assertTrue(result.isEmpty());
    }

    @Test
    void testGetVolunteerById_WhenVolunteerExists_ReturnsVolunteer() {
        // Arrange
        Volunteer volunteer = new Volunteer(1, "John", "Doe", 25, "john@example.com", "123456789", "123 Street",
                "Engineering");
        Map<Integer, Volunteer> volunteers = new HashMap<>();
        volunteers.put(1, volunteer);
        setField(volunteerService, "volunteers", volunteers);

        // Act
        Volunteer result = volunteerService.getVolunteerById(1);

        // Assert
        assertNotNull(result);
        assertEquals(volunteer, result);
    }

    @Test
    void testGetVolunteerById_WhenVolunteerDoesNotExist_ReturnsNull() {
        // Arrange
        setField(volunteerService, "volunteers", new HashMap<>());

        // Act
        Volunteer result = volunteerService.getVolunteerById(1);

        // Assert
        assertNull(result);
    }

    @Test
    void testCreateVolunteer_ReturnsCreatedVolunteerWithIncrementedId() {
        // Arrange
        Volunteer volunteer = new Volunteer(0, "John", "Doe", 25, "john@example.com", "123456789", "123 Street",
                "Engineering");

        // Act
        Volunteer result = volunteerService.createVolunteer(volunteer);
        List<Volunteer> volunteers = volunteerService.getAllVolunteers();

        // Assert
        assertNotNull(result);
        assertEquals(1, result.getId());
        assertEquals(1, volunteers.size());
        assertEquals(result, volunteers.get(0));
    }

    @Test
    void testUpdateVolunteer_WhenVolunteerExists_ReturnsUpdatedVolunteer() {
        // Arrange
        Volunteer existingVolunteer = new Volunteer(1, "John", "Doe", 25, "john@example.com", "123456789", "123 Street",
                "Engineering");
        Map<Integer, Volunteer> volunteers = new HashMap<>();
        volunteers.put(1, existingVolunteer);
        setField(volunteerService, "volunteers", volunteers);

        Volunteer updatedVolunteer = new Volunteer(1, "Jane", "Doe", 30, "jane@example.com", "987654321", "456 Avenue",
                "Medicine");

        // Act
        Volunteer result = volunteerService.updateVolunteer(1, updatedVolunteer);
        Volunteer fetchedVolunteer = volunteerService.getVolunteerById(1);

        // Assert
        assertNotNull(result);
        assertEquals(updatedVolunteer, result);
        assertEquals(updatedVolunteer, fetchedVolunteer);
    }

    @Test
    void testUpdateVolunteer_WhenVolunteerDoesNotExist_ReturnsNull() {
        // Arrange
        setField(volunteerService, "volunteers", new HashMap<>());
        Volunteer updatedVolunteer = new Volunteer(1, "Jane", "Doe", 30, "jane@example.com", "987654321", "456 Avenue",
                "Medicine");

        // Act
        Volunteer result = volunteerService.updateVolunteer(1, updatedVolunteer);

        // Assert
        assertNull(result);
    }

    @Test
    void testDeleteVolunteer_WhenVolunteerExists_RemovesVolunteer() {
        // Arrange
        Volunteer volunteer = new Volunteer(1, "John", "Doe", 25, "john@example.com", "123456789", "123 Street",
                "Engineering");
        Map<Integer, Volunteer> volunteers = new HashMap<>();
        volunteers.put(1, volunteer);
        setField(volunteerService, "volunteers", volunteers);

        // Act
        volunteerService.deleteVolunteer(1);
        List<Volunteer> remainingVolunteers = volunteerService.getAllVolunteers();

        // Assert
        assertTrue(remainingVolunteers.isEmpty());
    }

    @Test
    void testDeleteVolunteer_WhenVolunteerDoesNotExist_NoChange() {
        // Arrange
        Map<Integer, Volunteer> volunteers = new HashMap<>();
        setField(volunteerService, "volunteers", volunteers);

        // Act
        volunteerService.deleteVolunteer(1);
        List<Volunteer> remainingVolunteers = volunteerService.getAllVolunteers();

        // Assert
        assertTrue(remainingVolunteers.isEmpty());
    }

    @Test
    void testGetAllVolunteersSorted_WhenSortingByFirstNameAscending_ReturnsSortedVolunteersByFirstNameAscending() {
        // Arrange
        Volunteer volunteer1 = new Volunteer(1, "John", "Doe", 25, "john@example.com", "123456789", "123 Street",
                "Engineering");
        Volunteer volunteer2 = new Volunteer(2, "Alice", "Smith", 30, "alice@example.com", "987654321", "456 Avenue",
                "Medicine");
        List<Volunteer> expectedVolunteers = Arrays.asList(volunteer2, volunteer1);
        volunteerService.createVolunteer(volunteer1);
        volunteerService.createVolunteer(volunteer2);

        // Act
        List<Volunteer> result = volunteerService.getAllVolunteersSorted("firstName", "asc");

        // Assert
        assertEquals(expectedVolunteers, result);
    }

    @Test
    void testGetPaginatedVolunteers_WhenPageIsOneAndPageSizeIsTwo_ReturnsFirstTwoVolunteers() {
        // Arrange
        Volunteer volunteer1 = new Volunteer(1, "John", "Doe", 25, "john@example.com", "123456789", "123 Street",
                "Engineering");
        Volunteer volunteer2 = new Volunteer(2, "Alice", "Smith", 30, "alice@example.com", "987654321", "456 Avenue",
                "Medicine");
        Volunteer volunteer3 = new Volunteer(3, "Bob", "Johnson", 28, "bob@example.com", "456789123", "789 Boulevard",
                "Science");
        volunteerService.createVolunteer(volunteer1);
        volunteerService.createVolunteer(volunteer2);
        volunteerService.createVolunteer(volunteer3);
        List<Volunteer> expectedVolunteers = Arrays.asList(volunteer1, volunteer2);

        // Act
        List<Volunteer> result = volunteerService.getPaginatedVolunteers(1, 2);

        // Assert
        assertEquals(expectedVolunteers, result);
    }

    @Test
    void testGetPaginatedVolunteers_WhenPageIsTwoAndPageSizeIsTwo_ReturnsNextTwoVolunteers() {
        // Arrange
        Volunteer volunteer1 = new Volunteer(1, "John", "Doe", 25, "john@example.com", "123456789", "123 Street",
                "Engineering");
        Volunteer volunteer2 = new Volunteer(2, "Alice", "Smith", 30, "alice@example.com", "987654321", "456 Avenue",
                "Medicine");
        Volunteer volunteer3 = new Volunteer(3, "Bob", "Johnson", 28, "bob@example.com", "456789123", "789 Boulevard",
                "Science");
        volunteerService.createVolunteer(volunteer1);
        volunteerService.createVolunteer(volunteer2);
        volunteerService.createVolunteer(volunteer3);
        List<Volunteer> expectedVolunteers = Collections.singletonList(volunteer3);

        // Act
        List<Volunteer> result = volunteerService.getPaginatedVolunteers(2, 2);

        // Assert
        assertEquals(expectedVolunteers, result);
    }

    // Add more test cases...

    // Utility method to set private fields using reflection
    private void setField(Object obj, String fieldName, Object value) {
        try {
            Field field = obj.getClass().getDeclaredField(fieldName);
            field.setAccessible(true);
            field.set(obj, value);
        } catch (NoSuchFieldException | IllegalAccessException e) {
            throw new RuntimeException("Error setting field " + fieldName, e);
        }
    }
}
