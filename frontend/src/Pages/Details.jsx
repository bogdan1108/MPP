import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../AuthProvider"; // Import useAuth hook

export const Details = () => {
    const { id } = useParams();
    const [volunteer, setVolunteer] = useState(null);
    const navigate = useNavigate();
    const { currentUser } = useAuth(); // Get currentUser from useAuth

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

    if (!volunteer) {
        return <div>Loading...</div>;
    }

    const handleAddTask = () => {
        // Redirect to the add task page
        navigate("/addtask");
    };

    const handleDeleteTask = (taskId) => {
        // Handle task deletion logic
        console.log(`Delete task with id: ${taskId}`);
    };

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
            <div style={{ marginBottom: "10px" }}>
                <h1 style={{ fontSize: "24px", fontWeight: "bold", marginTop: "10px", marginBottom: "10px" }}>Tasks</h1>
                <ul>
                    {volunteer.tasks.map((task, index) => (
                        <li key={index}>
                            <strong>Name:</strong> {task.name} <br />
                            <strong>Description:</strong> {task.description} <br />
                            {currentUser?.role === 'ADMIN' && (
                                <button
                                    onClick={() => handleDeleteTask(task.id)}
                                    style={{
                                        backgroundColor: "red",
                                        color: "white",
                                        padding: "5px 10px",
                                        fontSize: "10px",
                                        borderRadius: "12px",
                                        cursor: "pointer"
                                    }}
                                >
                                    Delete
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
                {currentUser?.role === 'ADMIN' && (
                    <button onClick={handleAddTask}
                        style={{
                            backgroundColor: "blue",
                            color: "white",
                            padding: "5px 10px",
                            fontSize: "30px",
                            borderRadius: "12px",
                            cursor: "pointer",
                            marginTop: "30px"
                        }}
                    >
                        Add Task
                    </button>
                )}
            </div>
        </div>
    );
};
