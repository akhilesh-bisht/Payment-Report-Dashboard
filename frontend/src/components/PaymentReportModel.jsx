"use client";

import { useState, useEffect } from "react";
import { BagIcon, CheckCircleIcon, CoinsIcon, XIcon } from "./Icons";
import { getSummaryById } from "../api/api.js";

function PaymentReportModal({
  onClose,
  employeeId,
  summaryData,
  name,
  empId,
  location,
  id,
}) {
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (employeeId) {
      const fetchData = async () => {
        try {
          const response = await getSummaryById(employeeId);
          setPaymentData(response || []);
        } catch (err) {
          console.error("Error fetching data:", err);
          setError("Failed to load data.");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [employeeId]);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-IN", options);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-7xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-[#5D5A80]">
              Employee Payment Report
            </h2>
          </div>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-6 flex items-center">
              <div className="bg-gray-200 rounded-full p-4 mr-4">
                <BagIcon className="w-8 h-8 text-gray-700" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Collection (MM)</p>
                <p className="text-gray-600 text-sm">(All Locations)</p>
                <p className="text-xl font-semibold">
                  ₹{summaryData.totalCollection}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 flex items-center">
              <div className="bg-green-100 rounded-full p-4 mr-4">
                <CheckCircleIcon className="w-8 h-8 text-green-500" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Deposit Amount</p>
                <p className="text-gray-600 text-sm">(All Locations)</p>
                <p className="text-xl font-semibold text-green-500">
                  ₹{summaryData.totalDeposit}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 flex items-center">
              <div className="bg-red-100 rounded-full p-4 mr-4">
                <CoinsIcon className="w-8 h-8 text-red-500" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Difference Amount</p>
                <p className="text-gray-600 text-sm">(All Locations)</p>
                <p className="text-xl font-semibold text-red-500">
                  ₹{summaryData.difference}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Data Table */}
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
                {paymentData.map((row, index) => {
                  const diff = row.difference;
                  const diffDisplay =
                    typeof diff === "number"
                      ? diff < 0
                        ? `(-)${Math.abs(diff).toLocaleString()}`
                        : `(+)${diff.toLocaleString()}`
                      : "-";
                  const diffColor =
                    diff < 0
                      ? "text-red-500"
                      : diff > 0
                      ? "text-green-500"
                      : "";

                  return (
                    <tr key={index} className=" hover:bg-gray-50 text-sm">
                      <td className="py-4">{location}</td>
                      <td className="py-4">{id}</td>
                      <td className="py-4">{name}</td>
                      <td className="py-4">
                        {row.collectionAmount?.toLocaleString() || "-"}
                      </td>
                      <td className="py-4">{formatDate(row.collectionDate)}</td>
                      <td className="py-4">
                        {row.depositAmount?.toLocaleString() || "-"}
                      </td>
                      <td className="py-4">{formatDate(row.depositDate)}</td>
                      <td className={`py-4 ${diffColor}`}>{diffDisplay}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentReportModal;
