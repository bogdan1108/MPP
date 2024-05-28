import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const EditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [volunteer, setVolunteer] = useState(null);

    useEffect(() => {
        const fetchVolunteerDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/volunteers/${id}`);
                setVolunteer(response.data);
            } catch (error) {
                console.error('Error fetching volunteer details:', error.message);
            }
        };

        fetchVolunteerDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVolunteer(prevVolunteer => ({
            ...prevVolunteer,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/volunteers/${id}`, volunteer);
            navigate(`/`);
        } catch (error) {
            console.error('Error updating volunteer:', error.message);
        }
    };

    const handleBack = () => {
        navigate("/");
    };

    if (!volunteer) {
        return <div>Loading...</div>;
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
