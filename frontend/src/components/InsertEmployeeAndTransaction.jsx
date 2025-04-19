"use client";

import { useState, useEffect } from "react";
import { createEmployee, createTransaction } from "../api/api.js";

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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getNextEmployeeId = (currentId = 6) => {
    return `EMP${currentId.toString().padStart(3, "0")}`;
  };

  useEffect(() => {
    const nextId = getNextEmployeeId(8);
    setEmployeeData((prev) => ({ ...prev, employeeId: nextId }));
  }, []);

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
      // 1. Create employee
      const employeeRes = await createEmployee(employeeData);
      const employeeMongoId = employeeRes._id;

      // 2. Map transaction with correct fields
      const newTransactionData = {
        employeeId: employeeMongoId,
        collectionAmount: transactionData.collectionAmount,
        depositAmount: transactionData.depositAmount,
        date: transactionData.collectionDate, // Mapped correctly
        depositDate: transactionData.depositDate,
      };

      console.log("Sending transaction:", newTransactionData);

      //  3. Create transaction
      const transactionRes = await createTransaction(newTransactionData);

      //  4. Callbacks
      onSuccess?.({ employeeRes, transactionRes });
      onClose?.();
    } catch (err) {
      console.error(err);
      setError("Failed to insert data. Please try again.");
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
        {/* Employee Form Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">
            Employee Details
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
            readOnly
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

        {/* Transaction Form Section */}
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
            className="w-full border rounded p-2"
          />
          <input
            name="collectionDate"
            type="date"
            value={transactionData.collectionDate}
            onChange={handleTransactionChange}
            className="w-full border rounded p-2"
          />
          <input
            name="depositAmount"
            type="number"
            value={transactionData.depositAmount}
            onChange={handleTransactionChange}
            placeholder="Deposit Amount"
            className="w-full border rounded p-2"
          />
          <input
            name="depositDate"
            type="date"
            value={transactionData.depositDate}
            onChange={handleTransactionChange}
            className="w-full border rounded p-2"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="bg-[#664895] text-white px-4 py-2 rounded hover:bg-[#553a7a]"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Both"}
        </button>
      </form>
    </div>
  );
}

export default InsertEmployeeAndTransaction;
