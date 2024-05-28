import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../GlobalState";

export const AddPage = () => {
  const navigate = useNavigate();
  const { createVolunteer } = useGlobalState();
  const [volunteer, setVolunteer] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    phone: "",
    address: "",
    faculty: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the field is 'age' and the value is not a valid number
    if (name === 'age' && isNaN(value)) {
      // Display a warning using a modal dialog
      alert('Please enter a valid age (numeric value)');
      return; // Exit early, don't update the state
    }

    // Update the volunteer state as usual
    setVolunteer(prevVolunteer => ({
      ...prevVolunteer,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createVolunteer(volunteer); // Call addVolunteer from global state
    navigate("/"); // Navigate to home page
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", maxWidth: "500px", margin: "10px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px", backgroundColor: "white", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ marginBottom: "20px", color: "#333" }}>Add Volunteer</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={volunteer.firstName}
            onChange={handleChange}
            style={{ padding: "10px", width: "100%", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "10px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={volunteer.lastName}
            onChange={handleChange}
            style={{ padding: "10px", width: "100%", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "10px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Age"
            name="age"
            value={volunteer.age}
            onChange={handleChange}
            style={{ padding: "10px", width: "100%", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "10px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={volunteer.email}
            onChange={handleChange}
            style={{ padding: "10px", width: "100%", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "10px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            value={volunteer.phone}
            onChange={handleChange}
            style={{ padding: "10px", width: "100%", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "10px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={volunteer.address}
            onChange={handleChange}
            style={{ padding: "10px", width: "100%", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Faculty"
            name="faculty"
            value={volunteer.faculty}
            onChange={handleChange}
            style={{ padding: "10px", width: "100%", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "10px" }}
          />
        </div>
        <button type="button" onClick={handleBack} style={{ backgroundColor: "grey", color: "white", padding: "10px 20px", borderRadius: "5px", border: "none", cursor: "pointer", marginRight: "10px"}}>Back</button>
        <button type="submit" style={{ backgroundColor: "#007bff", color: "white", padding: "10px 20px", borderRadius: "5px", border: "none", cursor: "pointer" }}>Add Volunteer</button>
      </form>
    </div>
  );
};
