"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import OutstandingReport from "../components/OutstandingReport.jsx";
import PaymentReportModal from "../components/PaymentReportModel.jsx";
import { ChevronDown } from "../components/Icons";
import { logoutUser } from "../api/api.js";

function Dashboard() {
  const [showPaymentReport, setShowPaymentReport] = useState(false);
  const navigate = useNavigate(); // or useRouter()

  const handleLogout = async () => {
    const success = await logoutUser();
    if (success) {
      navigate("/login");
    } else {
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-[#5D5A80]">
            Outstanding Report (All Locations)
          </h1>

          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition"
            >
              Logout
            </button>

            <img
              src="/avatar.png"
              alt="User"
              className="w-8 h-8 rounded-full border border-gray-300"
            />
            <ChevronDown className="text-gray-500" />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <OutstandingReport
            onOpenPaymentReport={() => setShowPaymentReport(true)}
          />
        </main>
      </div>

      {/* Payment Report Modal */}
      {showPaymentReport && (
        <PaymentReportModal onClose={() => setShowPaymentReport(false)} />
      )}
    </div>
  );
}

export default Dashboard;
