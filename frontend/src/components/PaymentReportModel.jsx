"use client";

import { useState } from "react";
import {
  BagIcon,
  CheckCircleIcon,
  CoinsIcon,
  ChevronLeft,
  ChevronRight,
  XIcon,
  ChevronDown,
} from "./Icons";

function PaymentReportModal({ onClose }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Sample data
  const paymentData = [
    {
      location: "BGRoad, Karnataka",
      empId: 1,
      empName: "Mayank",
      collections: 10000,
      date: "26 Mar 2025",
      cashDeposit: 5000,
      depositDate: "28 Mar 2025",
      difference: "-",
    },
    {
      location: "",
      empId: "",
      empName: "Mayank",
      collections: null,
      date: null,
      cashDeposit: 5000,
      depositDate: "29 Mar 2025",
      difference: "-",
    },
    {
      location: "BGRoad, Karnataka",
      empId: 1,
      empName: "Mayank",
      collections: 20000,
      date: "27 Mar 2025",
      cashDeposit: 2000,
      depositDate: "29 Mar 2025",
      difference: "-",
    },
    {
      location: "BGRoad, Karnataka",
      empId: 1,
      empName: "Mayank",
      collections: null,
      date: null,
      cashDeposit: 8000,
      depositDate: "30 Mar 2025",
      difference: "-",
    },
    {
      location: "BGRoad, Karnataka",
      empId: 1,
      empName: "Mayank",
      collections: null,
      date: null,
      cashDeposit: 10000,
      depositDate: "31 Mar 2025",
      difference: "-",
    },
    {
      location: "BGRoad, Karnataka",
      empId: 1,
      empName: "Mayank",
      collections: null,
      date: null,
      cashDeposit: 5000,
      depositDate: "31 Mar 2025",
      difference: 5000,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-[#5D5A80]">
            Employee Payment Report
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Collection Card */}
            <div className="bg-gray-50 rounded-lg p-4 flex items-center">
              <div className="bg-gray-200 rounded-full p-3 mr-4">
                <BagIcon className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Collection</p>
                <p className="text-gray-600 text-sm">(MM) Amount</p>
                <p className="text-xl font-semibold">₹87,000</p>
              </div>
            </div>

            {/* Total Deposit Card */}
            <div className="bg-gray-50 rounded-lg p-4 flex items-center">
              <div className="bg-green-100 rounded-full p-3 mr-4">
                <CheckCircleIcon className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Deposit</p>
                <p className="text-gray-600 text-sm">Amount</p>
                <p className="text-xl font-semibold text-green-500">₹55,000</p>
              </div>
            </div>

            {/* Difference Card */}
            <div className="bg-gray-50 rounded-lg p-4 flex items-center">
              <div className="bg-red-100 rounded-full p-3 mr-4">
                <CoinsIcon className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Difference</p>
                <p className="text-gray-600 text-sm">Amount</p>
                <p className="text-xl font-semibold text-red-500">₹32,000</p>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-2 font-medium">Location</th>
                  <th className="pb-2 font-medium">Emp. ID</th>
                  <th className="pb-2 font-medium">Emp. Name</th>
                  <th className="pb-2 font-medium">Collections (MM)</th>
                  <th className="pb-2 font-medium">Date</th>
                  <th className="pb-2 font-medium">Cash Deposit</th>
                  <th className="pb-2 font-medium">Deposit Date</th>
                  <th className="pb-2 font-medium">Difference</th>
                </tr>
              </thead>
              <tbody>
                {paymentData.map((row, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-4">{row.location}</td>
                    <td className="py-4">{row.empId}</td>
                    <td className="py-4">{row.empName}</td>
                    <td className="py-4">
                      {row.collections?.toLocaleString() || "-"}
                    </td>
                    <td className="py-4">{row.date || "-"}</td>
                    <td className="py-4">
                      {row.cashDeposit?.toLocaleString() || "-"}
                    </td>
                    <td className="py-4">{row.depositDate}</td>
                    <td className="py-4">{row.difference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            <span className="mr-2 text-sm">Show</span>
            <div className="relative">
              <select
                className="appearance-none bg-white border rounded px-3 py-1 pr-8 text-sm"
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>
            <span className="ml-2 text-sm">Rows</span>
          </div>

          <div className="flex items-center">
            <button
              className="p-1 rounded border mr-1 disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              <ChevronLeft className="w-5 h-5 text-gray-500" />
            </button>

            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`w-8 h-8 mx-1 rounded ${
                  currentPage === page
                    ? "bg-orange-100 text-[#E85C33]"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <span className="mx-1">...</span>

            <button
              className="w-8 h-8 mx-1 rounded hover:bg-gray-100"
              onClick={() => setCurrentPage(10)}
            >
              10
            </button>

            <button
              className="p-1 rounded border ml-1"
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentReportModal;
