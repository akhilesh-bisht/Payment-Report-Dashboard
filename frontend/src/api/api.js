// src/api/index.js (or api.js)

import axios from "axios";

// Create an instance of axios for the base API URL
const api = axios.create({
  baseURL: "/api", // Define your base API URL
  withCredentials: true, // Send credentials (cookies) with requests
});

// Login APIs
export const loginUser = async (email, password) => {
  const res = await api.post("/users/login", { email, password });
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.post("/users/logout");
  return res.data;
};

// Employee APIs
export const getEmployees = async () => {
  const res = await api.get("/employees");
  return res.data;
};

export const createEmployee = async (employee) => {
  const res = await api.post("/employees", employee);
  return res.data;
};

// Transaction APIs
export const createTransaction = async (data) => {
  const res = await api.post("/transactions", data);
  return res.data;
};

export const getEmployeeTransactions = async (id) => {
  const res = await api.get(`/transactions/${id}`);
  return res.data;
};

// Report APIs
export const getOutstandingReport = async () => {
  const res = await api.get("/reports/outstanding");
  return res.data;
};

// Summary Report API (updated to use axios)
export const getAllReport = async () => {
  try {
    // Get the token from localStorage
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("No authorization token found");
    }

    // Use axios to make the GET request with the Authorization header
    const response = await api.get("/reports/entries", {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token here in the headers
      },
    });

    // Return the response data
    return response.data;
  } catch (error) {
    console.error("Error fetching report data:", error);
    throw error; // Rethrow the error so it can be handled by the caller
  }
};
export const getSummaryReport = async () => {
  try {
    // Get the token from localStorage
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("No authorization token found");
    }

    // Use axios to make the GET request with the Authorization header
    const response = await api.get("/reports/summary", {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token here in the headers
      },
    });

    // Return the response data
    return response.data;
  } catch (error) {
    console.error("Error fetching report data:", error);
    throw error; // Rethrow the error so it can be handled by the caller
  }
};
