import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import { useGlobalState } from "../GlobalState";
import { useAuth } from "../AuthProvider";

export const MasterPage = () => {
  const { volunteers, loading, error, fetchVolunteers, deleteVolunteer } = useGlobalState();
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5); // Number of items per page
  const [sortBy, setSortBy] = useState(null); // State to track sorting
  const [sortOrder, setSortOrder] = useState("asc"); // State to track sorting order
  const [volunteerToDelete, setVolunteerToDelete] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [serverError, setServerError] = useState(null);
  const chartRef = useRef(null);
  const navigate = useNavigate();
  const { user, logOut } = useAuth(); // Import logOut from useAuth

  useEffect(() => {
    const checkNetworkStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", checkNetworkStatus);
    window.addEventListener("offline", checkNetworkStatus);

    checkNetworkStatus();

    return () => {
      window.removeEventListener("online", checkNetworkStatus);
      window.removeEventListener("offline", checkNetworkStatus);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/volunteers');
        if (!response.ok) {
          throw new Error('Server is down');
        }
      } catch (error) {
        console.error(error);
        setServerError(error); // Set server error state to true
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    fetchVolunteers(); // Fetch data when component mounts
  }, []);

  useEffect(() => {
    renderPieChart(); // Render pie chart when data changes
  }, [volunteers, serverError]);

  // Function to handle pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle sorting
  const handleSort = (sortByField) => {
    if (sortBy === sortByField) {
      // Toggle sorting order if same field clicked
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set new field for sorting
      setSortBy(sortByField);
      setSortOrder("asc");
    }
  };

  const handleClick = (id) => {
    navigate(`/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleAddVolunteer = () => {
    navigate("/add");
  };

  const confirmDelete = (id) => {
    setVolunteerToDelete(id);
    setShowConfirmation(true);
  };

  const cancelDelete = () => {
    setVolunteerToDelete(null);
    setShowConfirmation(false);
  };

  const proceedDelete = () => {
    deleteVolunteer(volunteerToDelete);
    setVolunteerToDelete(null);
    setShowConfirmation(false);
  };

  const renderPieChart = () => {
    const faculties = {};
    volunteers.forEach((volunteer) => {
      if (faculties[volunteer.faculty]) {
        faculties[volunteer.faculty]++;
      } else {
        faculties[volunteer.faculty] = 1;
      }
    });

    const chartData = {
      labels: Object.keys(faculties),
      datasets: [{
        data: Object.values(faculties),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)'
        ],
        borderWidth: 1
      }]
    };

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById('pieChart');
    chartRef.current = new Chart(ctx, {
      type: 'pie',
      data: chartData,
    });
  };

  // Apply pagination and sorting
  const sortedData = volunteers.sort((a, b) => {
    const nameA = a.firstName.toUpperCase();
    const nameB = b.firstName.toUpperCase();
    if (sortOrder === "asc") {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  return (
    <div style={{ textAlign: "center" }}>
      {isOnline ? (
        <>
          <div style={{ border: "1px solid #ccc", borderRadius: "8px", maxWidth: "300px", maxHeight: "300px", margin: "10px auto" }}>
            <canvas id="pieChart" width="100" height="100"></canvas>
          </div>
          <div style={{ position: "relative", border: "1px solid #ccc", borderRadius: "8px", maxWidth: "300px", margin: "10px auto", padding: "20px" }}>
            <h1 style={{ fontSize: "24px", fontWeight: "bold", marginTop: "10px", marginBottom: "20px" }}>Volunteers</h1>
            <button
              onClick={handleAddVolunteer}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                backgroundColor: "#007bff",
                color: "white",
                padding: "2px 12px",
                fontSize: "20px",
                borderRadius: "50%",
                cursor: "pointer",
                border: "none",
                zIndex: "1"
              }}
            >
              +
            </button>
            <button
              onClick={logOut} // Log out button
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                backgroundColor: "grey",
                color: "white",
                padding: "3px 6px",
                fontSize: "9px",
                borderRadius: "4px",
                cursor: "pointer",
                border: "none",
                zIndex: "1"
              }}
            >
              Log Out
            </button>
            <button
              onClick={() => handleSort("firstName")}
              style={{
                backgroundColor: "grey",
                color: "white",
                padding: "2px 4px",
                borderRadius: "8px",
                cursor: "pointer",
                border: "none",
                marginLeft: "10px",
                fontSize: "12px",
                marginBottom: "25px"
              }}
            >
              Sort by First Name {sortBy === "firstName" && `(${sortOrder === "asc" ? "Asc" : "Desc"})`}
            </button>
            {paginatedData.map((volunteer, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
                <p style={{ marginBottom: "5px" }}>Name: {volunteer.firstName} {volunteer.lastName}</p>
                <div>
                  <button
                    onClick={() => handleClick(volunteer.id)}
                    style={{
                      backgroundColor: "blue",
                      color: "white",
                      padding: "5px 10px",
                      fontSize: "10px",
                      borderRadius: "12px",
                      cursor: "pointer",
                      marginRight: "5px"
                    }}
                  >
                    Details
                  </button>
                  {user && user.role === "ADMIN" && ( // Only show edit and delete buttons if user is an admin}
                  <>
                  <button
                    onClick={() => handleEdit(volunteer.id)}
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      padding: "5px 10px",
                      fontSize: "10px",
                      borderRadius: "12px",
                      cursor: "pointer",
                      marginRight: "5px"
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(volunteer.id)}
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
                  </>
                  )}
                </div>
              </div>
            ))}
            {showConfirmation && (
              <div style={{ position: "fixed", top: "0", left: "0", width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: "2", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" }}>
                  <p>Are you sure you want to delete this volunteer?</p>
                  <button onClick={proceedDelete} style={{ backgroundColor: "red", color: "white", padding: "5px 10px", borderRadius: "5px", cursor: "pointer", marginRight: "10px" }}>Yes</button>
                  <button onClick={cancelDelete} style={{ backgroundColor: "#007bff", color: "white", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}>No</button>
                </div>
              </div>
            )}
            {/* Pagination */}
            <div style={{ marginTop: "20px" }}>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 0}
                style={{
                  backgroundColor: "grey",
                  color: "white",
                  padding: "8px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  border: "none",
                  marginRight: "5px",
                  fontSize: "16px"
                }}
              >
                {"<"}
              </button>

              {/* Page number */}
              <span style={{ marginLeft: "5px", marginRight: "5px", fontSize: "16px", color: "#333" }}>
                Page {currentPage + 1} of {Math.ceil(volunteers.length / itemsPerPage)}
              </span>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={(currentPage + 1) * itemsPerPage >= volunteers.length}
                style={{
                  backgroundColor: "grey",
                  color: "white",
                  padding: "8px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  border: "none",
                  fontSize: "16px"
                }}
              >
                {">"}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div style={{ color: "red", fontSize: "24px", fontWeight: "bold", marginTop: "20px" }}>You are offline. Please check your network connection.</div>
      )}
      {serverError && (
        <div style={{ color: "red", fontSize: "24px", fontWeight: "bold", marginTop: "20px" }}>Server is down. Please try again later.</div>
      )}
    </div>
  );
};
