import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Volunteers } from "../volunteers";



export const EditPage = () => {
    const [data, setData] = useState([Volunteers]); // Initialize data with Volunteers array
    useEffect(() => {
        setData(Volunteers);
      }, []);

  const { id } = useParams();
  const navigate = useNavigate();

  const [volunteer, setVolunteer] = useState({
    id: "",
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    phone: "",
    address: "",
    faculty: ""
  });

  useEffect(() => {
    const foundVolunteer = Volunteers.find((volunteer) => volunteer.id === parseInt(id));
    if (foundVolunteer) {
      setVolunteer(foundVolunteer);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVolunteer(prevVolunteer => ({
      ...prevVolunteer,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    const updatedVolunteer = {
        id: volunteer.id,
        firstName: volunteer.firstName,
        lastName: volunteer.lastName,
        age: volunteer.age,
        email: volunteer.email,
        phone: volunteer.phone,
        address: volunteer.address,
        faculty: volunteer.faculty
        };
    data[volunteer.id - 1] = updatedVolunteer;
    setData(data);
    navigate(`/`);
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate(`/`);
  }

  return (
    <div style={{ textAlign: "center", maxWidth: "500px", margin: "10px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px", backgroundColor: "white", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}>
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Edit Volunteer</h2>
        <form onSubmit={handleSubmit} onBack={handleBack}>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={volunteer.firstName}
              onChange={handleChange}
              style={{ padding: "10px", width: "100%", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "10px" }}
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
          <button type="back" onClick={handleBack} style={{ backgroundColor: "grey", color: "white", padding: "10px 20px", borderRadius: "5px", border: "none", cursor: "pointer", marginRight: "10px" }}>Back</button>
          <button type="submit" style={{ backgroundColor: "#007bff", color: "white", padding: "10px 20px", borderRadius: "5px", border: "none", cursor: "pointer" }}>Save Changes</button>
        </form>
      </div>
  );
};
