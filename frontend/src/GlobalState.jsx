import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";

// Define initial state
const initialState = {
  volunteers: [],
  loading: false,
  error: null,
};

// Define action types
const actionTypes = {
  FETCH_VOLUNTEERS_REQUEST: "FETCH_VOLUNTEERS_REQUEST",
  FETCH_VOLUNTEERS_SUCCESS: "FETCH_VOLUNTEERS_SUCCESS",
  FETCH_VOLUNTEERS_FAILURE: "FETCH_VOLUNTEERS_FAILURE",
  DELETE_VOLUNTEER_REQUEST: "DELETE_VOLUNTEER_REQUEST",
  DELETE_VOLUNTEER_SUCCESS: "DELETE_VOLUNTEER_SUCCESS",
  DELETE_VOLUNTEER_FAILURE: "DELETE_VOLUNTEER_FAILURE",
  ADD_VOLUNTEER_REQUEST: "ADD_VOLUNTEER_REQUEST",
  ADD_VOLUNTEER_SUCCESS: "ADD_VOLUNTEER_SUCCESS",
  ADD_VOLUNTEER_FAILURE: "ADD_VOLUNTEER_FAILURE",
  UPDATE_VOLUNTEER_REQUEST: "UPDATE_VOLUNTEER_REQUEST",
  UPDATE_VOLUNTEER_SUCCESS: "UPDATE_VOLUNTEER_SUCCESS",
  UPDATE_VOLUNTEER_FAILURE: "UPDATE_VOLUNTEER_FAILURE",
};

// Define reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCH_VOLUNTEERS_REQUEST:
    case actionTypes.DELETE_VOLUNTEER_REQUEST:
    case actionTypes.ADD_VOLUNTEER_REQUEST:
    case actionTypes.UPDATE_VOLUNTEER_REQUEST:
      return { ...state, loading: true, error: null };
    case actionTypes.FETCH_VOLUNTEERS_SUCCESS:
      return { ...state, volunteers: action.payload, loading: false, error: null };
    case actionTypes.FETCH_VOLUNTEERS_FAILURE:
    case actionTypes.DELETE_VOLUNTEER_FAILURE:
    case actionTypes.ADD_VOLUNTEER_FAILURE:
    case actionTypes.UPDATE_VOLUNTEER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case actionTypes.DELETE_VOLUNTEER_SUCCESS:
      return {
        ...state,
        volunteers: state.volunteers.filter((volunteer) => volunteer.id !== action.payload),
        loading: false,
        error: null,
      };
    case actionTypes.ADD_VOLUNTEER_SUCCESS:
      return {
        ...state,
        volunteers: [...state.volunteers, action.payload],
        loading: false,
        error: null,
      };
    case actionTypes.UPDATE_VOLUNTEER_SUCCESS:
      return {
        ...state,
        volunteers: state.volunteers.map((volunteer) =>
          volunteer.id === action.payload.id ? action.payload : volunteer
        ),
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

// Create context
const GlobalStateContext = createContext();

// Create provider component
export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch volunteers
  const fetchVolunteers = () => {
    dispatch({ type: actionTypes.FETCH_VOLUNTEERS_REQUEST });
    axios
      .get("http://localhost:8080/api/volunteers")
      .then((response) => {
        dispatch({ type: actionTypes.FETCH_VOLUNTEERS_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: actionTypes.FETCH_VOLUNTEERS_FAILURE, payload: error.message });
      });
  };

  // Delete volunteer
  const deleteVolunteer = (volunteerId) => {
    dispatch({ type: actionTypes.DELETE_VOLUNTEER_REQUEST });
    axios
      .delete(`http://localhost:8080/api/volunteers/${volunteerId}`)
      .then((response) => {
        dispatch({ type: actionTypes.DELETE_VOLUNTEER_SUCCESS, payload: volunteerId });
        console.log("Volunteer deleted successfully");
      })
      .catch((error) => {
        dispatch({ type: actionTypes.DELETE_VOLUNTEER_FAILURE, payload: error.message });
        console.error("Error deleting volunteer:", error);
      });
  };

  // Add volunteer
  const createVolunteer = (volunteerData) => {
    dispatch({ type: actionTypes.ADD_VOLUNTEER_REQUEST });
    axios
      .post("http://localhost:8080/api/volunteers", volunteerData)
      .then((response) => {
        dispatch({ type: actionTypes.ADD_VOLUNTEER_SUCCESS, payload: response.data });
        console.log("Volunteer added successfully:", response.data);
      })
      .catch((error) => {
        dispatch({ type: actionTypes.ADD_VOLUNTEER_FAILURE, payload: error.message });
        console.error("Error adding volunteer:", error);
      });
  };

  // Update volunteer
  const updateVolunteer = (volunteerId, updatedData) => {
    dispatch({ type: actionTypes.UPDATE_VOLUNTEER_REQUEST });
    axios
      .put(`http://localhost:8080/api/volunteers/${volunteerId}`, updatedData)
      .then((response) => {
        dispatch({ type: actionTypes.UPDATE_VOLUNTEER_SUCCESS, payload: response.data });
        console.log("Volunteer updated successfully:", response.data);
      })
      .catch((error) => {
        dispatch({ type: actionTypes.UPDATE_VOLUNTEER_FAILURE, payload: error.message });
        console.error("Error updating volunteer:", error);
      });
  };

  return (
    <GlobalStateContext.Provider
      value={{ ...state, fetchVolunteers, deleteVolunteer, createVolunteer, updateVolunteer }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to use global state
export const useGlobalState = () => useContext(GlobalStateContext);
