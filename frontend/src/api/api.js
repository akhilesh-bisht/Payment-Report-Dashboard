import axios from "axios";

const api = axios.create({
  baseURL: "https://payment-report-dashboard.onrender.com/api",
  withCredentials: true,
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
  try {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("No authorization token found");
    }

    console.log("Sending employee:", employee);

    const res = await api.post("/employees", employee, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("❌ Server responded with:", error.response?.data);
    console.error("❌ Full error object:", error);
    throw error;
  }
};

// Transaction APIs
export const createTransaction = async (data) => {
  try {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("No authorization token found");
    }

    const res = await api.post("/transactions", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
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
        Authorization: `Bearer ${token}`,
      },
    });

    // Return the response data
    return response.data;
  } catch (error) {
    console.error("Error fetching report data:", error);
    throw error; // Rethrow the error so it can be handled by the caller
  }
};
export const getSummaryById = async (employeeId) => {
  try {
    // Get the token from localStorage
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("No authorization token found");
    }

    // Use axios to make the GET request with the Authorization header
    const response = await api.get(`/reports/employee/${employeeId}`, {
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
