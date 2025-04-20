"use client";

import { useState, useEffect } from "react";
import { createEmployee, createTransaction, getAllReport } from "../api/api.js";

function InsertEmployeeAndTransaction({ onClose, onSuccess }) {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    employeeId: "",
    location: "",
  });

  const [transactionData, setTransactionData] = useState({
    collectionAmount: "",
    collectionDate: "",
    depositAmount: "",
    depositDate: "",
  });

  const [employeeList, setEmployeeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isNewEmployee, setIsNewEmployee] = useState(false);

  useEffect(() => {
    const fetchEmployeeList = async () => {
      try {
        const response = await getAllReport();
        if (response.entries && Array.isArray(response.entries)) {
          setEmployeeList(response.entries);
        } else {
          console.error(
            "Entries from getAllReport are not in expected format:",
            response
          );
          setError("Failed to load employee data.");
        }
      } catch (err) {
        console.error("Error fetching employees:", err);
        setError("Failed to load employee data.");
      }
    };

    fetchEmployeeList();
  }, []);

  const handleEmployeeSelect = (e) => {
    const selectedId = e.target.value;

    if (selectedId === "new") {
      setIsNewEmployee(true);
      setSelectedEmployee(null);
      setEmployeeData({ name: "", employeeId: "", location: "" });
    } else {
      setIsNewEmployee(false);
      const employee = employeeList.find((emp) => emp.id._id === selectedId);
      setSelectedEmployee(employee);
      setEmployeeData({
        name: employee.id.name,
        employeeId: employee.id.employeeId,
        location: employee.id.location,
      });
    }
  };

  const handleEmployeeChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTransactionChange = (e) => {
    const { name, value } = e.target;
    setTransactionData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let employeeMongoId;
      let employeeRes;

      if (isNewEmployee) {
        employeeRes = await createEmployee(employeeData);
        employeeMongoId = employeeRes._id;
      } else if (
        selectedEmployee &&
        selectedEmployee.id &&
        selectedEmployee.id._id
      ) {
        employeeMongoId = selectedEmployee.id._id;
      } else {
        throw new Error("No valid employee selected or employee has no ID");
      }

      const newTransactionData = {
        employeeId: employeeMongoId,
        collectionAmount: transactionData.collectionAmount,
        depositAmount: transactionData.depositAmount,
        date: transactionData.collectionDate,
        depositDate: transactionData.depositDate,
      };
      console.log("New transaction data:", newTransactionData);

      const transactionRes = await createTransaction(newTransactionData);
      onSuccess?.({ employeeRes, transactionRes });
      onClose?.();
    } catch (err) {
      console.error("Error submitting transaction:", err);
      setError("Failed to insert transaction data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl w-full">
      <h2 className="text-xl font-semibold mb-4">
        Insert Employee & Transaction
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Select Employee</h3>
          <select
            className="w-full border rounded p-2"
            onChange={handleEmployeeSelect}
            required
          >
            <option value="">Select an employee</option>
            <option value="new">➕ Add New Employee</option>
            {employeeList.map((employee) => (
              <option key={employee.id._id} value={employee.id._id}>
                {employee.empName} ({employee.empId})
              </option>
            ))}
          </select>
        </div>

        {isNewEmployee ? (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">
              New Employee Details
            </h3>
            <input
              name="name"
              value={employeeData.name}
              onChange={handleEmployeeChange}
              placeholder="Employee Name"
              required
              className="w-full border rounded p-2"
            />
            <input
              name="employeeId"
              value={employeeData.employeeId}
              onChange={handleEmployeeChange}
              placeholder="Employee ID"
              required
              className="w-full border rounded p-2"
            />
            <input
              name="location"
              value={employeeData.location}
              onChange={handleEmployeeChange}
              placeholder="Location"
              required
              className="w-full border rounded p-2"
            />
          </div>
        ) : (
          selectedEmployee && (
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-700">
                Selected Employee
              </h3>
              <p className="font-semibold">{selectedEmployee.empName}</p>
              <p className="text-sm text-gray-500">{selectedEmployee.empId}</p>
              <p className="text-sm text-gray-500">
                Location: {selectedEmployee.location}
              </p>
            </div>
          )
        )}

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">
            Transaction Details
          </h3>
          <input
            name="collectionAmount"
            type="number"
            value={transactionData.collectionAmount}
            onChange={handleTransactionChange}
            placeholder="Collection Amount"
            required
            className="w-full border rounded p-2"
          />
          <input
            name="collectionDate"
            type="date"
            value={transactionData.collectionDate}
            onChange={handleTransactionChange}
            required
            className="w-full border rounded p-2"
          />
          <input
            name="depositAmount"
            type="number"
            value={transactionData.depositAmount}
            onChange={handleTransactionChange}
            placeholder="Deposit Amount"
            required
            className="w-full border rounded p-2"
          />
          <input
            name="depositDate"
            type="date"
            value={transactionData.depositDate}
            onChange={handleTransactionChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="bg-[#664895] text-white px-4 py-2 rounded hover:bg-[#553a7a]"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Transaction"}
        </button>
      </form>
    </div>
  );
}

export default InsertEmployeeAndTransaction;
