"use client";

import { useState, useEffect } from "react";
import {
  BagIcon,
  CheckCircleIcon,
  CoinsIcon,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "./Icons";
import { getSummaryReport, getAllReport } from "../api/api.js";
import PaginationUI from "./PaginationUI.jsx";

function OutstandingReport({ onOpenPaymentReport }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [reportData, setReportData] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-IN", options);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [allReport, summary] = await Promise.all([
          getAllReport(),
          getSummaryReport(),
        ]);
        setReportData(allReport.entries || []);
        setSummaryData(summary || {});
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const totalPages = Math.ceil(reportData.length / rowsPerPage);
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  //  Show loader while data is being fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#664895] border-solid" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Breadcrumb */}
      <div className="px-4 md:px-6 py-4 text-sm text-gray-500 ">
        <span>Dashboard</span>
        <span className="mx-2">›</span>
        <span className="text-[#664895] ">Outstanding Report</span>
      </div>

      {/* Summary Cards */}
      <div className="flex flex-col md:flex-row flex-wrap md:flex-nowrap gap-4 md:gap-6 px-4 md:px-6 pb-4 md:pb-6">
        {/* Total Collection Card */}
        <div className="bg-gray-50 rounded-lg p-4 flex flex-1 items-center">
          <div className="bg-gray-200 rounded-full p-3 mr-4">
            <BagIcon className="w-6 h-6 text-gray-700" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Total Collection (MM)</p>
            <p className="text-gray-600 text-sm">(All Locations)</p>
            <p className="text-xl font-semibold">
              ₹{summaryData.totalCollection}
            </p>
          </div>
        </div>

        {/* Total Deposit Card */}
        <div className="bg-gray-50 rounded-lg p-4 flex flex-1 items-center">
          <div className="bg-green-100 rounded-full p-3 mr-4">
            <CheckCircleIcon className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Total Deposit Amount</p>
            <p className="text-gray-600 text-sm">(All Locations)</p>
            <p className="text-xl font-semibold text-green-500">
              ₹{summaryData.totalDeposit}
            </p>
          </div>
        </div>

        {/* Difference Card */}
        <div className="bg-gray-50 rounded-lg p-4 flex flex-1 items-center">
          <div className="bg-red-100 rounded-full p-3 mr-4">
            <CoinsIcon className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Difference Amount</p>
            <p className="text-gray-600 text-sm">(All Locations)</p>
            <p className="text-xl font-semibold text-red-500">
              ₹{summaryData.difference}
            </p>
          </div>
        </div>

        {/* Insert Button aligned with cards */}
        <div className="flex items-center justify-end">
          <button
            className=" bg-white text-[#E85C33]   px-4 py-2 rounded hover:bg-orange-50 whitespace-nowrap"
            onClick={onOpenPaymentReport}
          >
            Insert Employee Data
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="px-4 md:px-6 pb-4 md:pb-6 overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center py-4">
            <span>Loading...</span>
          </div>
        ) : (
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-2 font-medium">Location</th>
                <th className="pb-2 font-medium">Emp. ID</th>
                <th className="pb-2 font-medium">Emp. Name</th>
                <th className="pb-2 font-medium">Collections (MM)</th>
                <th className="pb-2 font-medium">Date</th>
                <th className="pb-2 font-medium">Difference</th>
              </tr>
            </thead>
            <tbody>
              {/* Slicing for pagination */}
              {reportData
                .slice(
                  (currentPage - 1) * rowsPerPage,
                  currentPage * rowsPerPage
                )
                .map((row, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 text-sm">
                    <td className="py-4">{row.location}</td>
                    <td className="py-4">{row.empId}</td>
                    <td className="py-4">{row.empName}</td>
                    <td className="py-4">
                      {row.collection?.toLocaleString() || "-"}
                    </td>
                    <td className="py-4">{formatDate(row.date)}</td>
                    <td
                      className={`py-4 ${
                        typeof row.difference === "number" && row.difference < 0
                          ? "text-red-500"
                          : typeof row.difference === "number" &&
                            row.difference > 0
                          ? "text-green-500"
                          : ""
                      }`}
                    >
                      {typeof row.difference === "number"
                        ? row.difference < 0
                          ? `(-)${Math.abs(row.difference).toLocaleString()}`
                          : row.difference > 0
                          ? `(+)${row.difference.toLocaleString()}`
                          : row.difference.toLocaleString()
                        : row.difference}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="px-4 md:px-6 py-4 border-t border-gray-200 flex flex-col md:flex-row items-center justify-start gap-40">
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

        {/* Pagination Buttons */}
        <div>
          <PaginationUI />
        </div>
      </div>
    </div>
  );
}

export default OutstandingReport;
