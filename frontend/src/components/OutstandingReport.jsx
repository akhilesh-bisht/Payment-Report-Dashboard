"use client";

import { useState, useEffect } from "react";
import { BagIcon, CheckCircleIcon, CoinsIcon } from "./Icons";
import { getSummaryReport, getAllReport } from "../api/api.js";
import PaymentReportModal from "./PaymentReportModel.jsx";
import PaginationUI from "./PaginationUI.jsx";
import InsertEmployeeAndTransaction from "./InsertEmployeeAndTransaction.jsx";

function OutstandingReport({ onOpenPaymentReport }) {
  const [reportData, setReportData] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showInsertForm, setShowInsertForm] = useState(false);

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

  const handleRowClick = (_id, name, empId, location) => {
    setSelectedEmployee({ _id, name, empId, location });
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#664895] border-solid" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden w-full">
      {/* Breadcrumb */}
      <div className="px-4 md:px-6 py-4 text-sm text-gray-500">
        <span>Dashboard</span>
        <span className="mx-2">›</span>
        <span className="text-[#664895]">Outstanding Report</span>
      </div>

      {/* Summary Cards */}
      <div className="flex flex-col md:flex-row flex-wrap gap-4 md:gap-6 px-4 md:px-6 pb-4 md:pb-6">
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

        <div className="flex items-center justify-end">
          <button
            className="bg-white text-[#E85C33] px-4 py-2 rounded hover:bg-orange-50 whitespace-nowrap"
            onClick={() => setShowInsertForm(true)}
          >
            Insert Employee Data
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="px-4 md:px-6 pb-4 md:pb-6 overflow-x-auto">
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
            {reportData.map((row) => (
              <tr
                key={row._id || row.empId}
                className="border-b hover:bg-gray-50 text-sm cursor-pointer"
                onClick={() =>
                  handleRowClick(
                    row.id._id,
                    row.empName,
                    row.empId,
                    row.location
                  )
                }
              >
                <td className="py-4">{row.location}</td>
                <td className="py-4">{row.empId}</td>
                <td className="py-4">{row.empName}</td>
                <td className="py-4">
                  {row.collection?.toLocaleString() || "-"}
                </td>
                <td className="py-4">{formatDate(row.date)}</td>
                <td
                  className={`py-4 ${
                    row.difference < 0
                      ? "text-red-500"
                      : row.difference > 0
                      ? "text-green-500"
                      : ""
                  }`}
                >
                  {typeof row.difference === "number"
                    ? row.difference < 0
                      ? `(-)${Math.abs(row.difference).toLocaleString()}`
                      : `(+)${row.difference.toLocaleString()}`
                    : row.difference}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-10 ml-44">
          <PaginationUI />
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedEmployee && (
        <PaymentReportModal
          summaryData={summaryData}
          employeeId={selectedEmployee._id}
          name={selectedEmployee.name}
          id={selectedEmployee.empId}
          location={selectedEmployee.location}
          onClose={() => setShowModal(false)}
        />
      )}

      {/*   form insert employe */}
      {showInsertForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <InsertEmployeeAndTransaction
            onClose={() => setShowInsertForm(false)}
            onSuccess={(res) => {
              console.log("Data saved:", res);
              setShowInsertForm(false);
              // optionally: refresh data here
            }}
          />
        </div>
      )}
    </div>
  );
}

export default OutstandingReport;
