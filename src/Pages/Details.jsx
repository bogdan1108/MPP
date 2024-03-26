import React from "react";
import { useParams } from "react-router-dom";
import { Volunteers } from "../volunteers";

export const Details = () => {
    const { id } = useParams();
    const volunteer = Volunteers.find((volunteer) => volunteer.id === parseInt(id));

    return (
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "10px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
            <h2>Volunteer Details</h2>
            <div style={{ marginBottom: "10px" }}>
                <strong>ID:</strong> {volunteer.id}
            </div>
            <div style={{ marginBottom: "10px" }}>
                <strong>First Name:</strong> {volunteer.firstName}
            </div>
            <div style={{ marginBottom: "10px" }}>
                <strong>Last Name:</strong> {volunteer.lastName}
            </div>
            <div style={{ marginBottom: "10px" }}>
                <strong>Age:</strong> {volunteer.age}
            </div>
            <div style={{ marginBottom: "10px" }}>
                <strong>Email:</strong> {volunteer.email}
            </div>
            <div style={{ marginBottom: "10px" }}>
                <strong>Phone:</strong> {volunteer.phone}
            </div>
            <div style={{ marginBottom: "10px" }}>
                <strong>Address:</strong> {volunteer.address}
            </div>
            <div style={{ marginBottom: "10px" }}>
                <strong>Faculty:</strong> {volunteer.faculty}
            </div>
            
        </div>
    );
};
