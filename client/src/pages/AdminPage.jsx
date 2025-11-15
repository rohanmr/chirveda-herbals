import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

export default function AdminPage() {
  const [tab, setTab] = useState("users");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; // 10 rows per page

  useEffect(() => {
    fetch("http://localhost:5000/api/admin-page")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load admin data");
        setLoading(false);
      });
  }, []);

  const formatValue = (value) => {
    if (value === null || value === undefined) return "—";
    if (
      value instanceof Date ||
      (typeof value === "string" &&
        !isNaN(Date.parse(value)) &&
        value.includes("-"))
    ) {
      return new Date(value).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    if (typeof value === "object") return JSON.stringify(value);
    return value;
  };

  const downloadExcel = (rows, tabName) => {
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, tabName);
    XLSX.writeFile(wb, `${tabName}_data.xlsx`);
  };

  const friendlyName = (col) => {
    const map = {
      id: "ID",
      name: "Name",
      email: "Email",
      createdAt: "Created At",
      orderId: "Order ID",
      totalAmount: "Total Amount",
      status: "Status",
      paymentMethod: "Payment Method",
      paidAt: "Paid At",
      date: "Date",
      fullName: "Full Name",
      userEmail: "User Email",
      contactNumber: "Contact Number",
      addressLine: "Address",
      city: "City",
      state: "State",
      pincode: "Pincode",
      visitedAt: "Visited At",
    };
    return map[col] || col;
  };

  const renderTable = (columns, rows, gradient) => {
    if (!rows || rows.length === 0)
      return <div className="text-center py-12 text-gray-500">No data available</div>;

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedRows = rows.slice(startIndex, endIndex);
    const totalPages = Math.ceil(rows.length / rowsPerPage);

    return (
      <>
        {/* Download button top-right */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-900">
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Data
          </h3>
          <button
            onClick={() => downloadExcel(rows, tab)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Download Excel
          </button>
        </div>

        <div className="overflow-x-auto shadow-md rounded-lg mb-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className={`${gradient}`}>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col}
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider"
                  >
                    {friendlyName(col)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedRows.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  {columns.map((col) => (
                    <td
                      key={col}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {col === "status" ? (
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            row[col] === "completed" || row[col] === "paid"
                              ? "bg-green-100 text-green-800"
                              : row[col] === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {row[col]}
                        </span>
                      ) : col === "totalAmount" ? (
                        <span className="font-medium">₹{row[col]}</span>
                      ) : (
                        formatValue(row[col])
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-2">
          <div>Page {currentPage} of {totalPages}</div>
          <div className="space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded text-white ${
                currentTab.buttonColor
              } disabled:opacity-50`}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded text-white ${
                currentTab.buttonColor
              } disabled:opacity-50`}
            >
              Next
            </button>
          </div>
        </div>
      </>
    );
  };

  const getTabConfig = () => ({
    users: {
      columns: ["id", "name", "email", "createdAt"],
      data: data?.users || [],
      gradient: "bg-gradient-to-r from-green-200 to-green-100",
      buttonColor: "bg-green-500 hover:bg-green-600",
    },
    orders: {
      columns: ["orderId", "email", "totalAmount", "status", "paymentMethod", "paidAt", "date"],
      data: data?.orders || [],
      gradient: "bg-gradient-to-r from-yellow-200 to-yellow-100",
      buttonColor: "bg-yellow-500 hover:bg-yellow-600",
    },
    addresses: {
      columns: ["fullName", "userEmail", "contactNumber", "addressLine", "city", "state", "pincode"],
      data: data?.addresses || [],
      gradient: "bg-gradient-to-r from-red-200 to-red-100",
      buttonColor: "bg-red-500 hover:bg-red-600",
    },
    leads: {
      columns: ["id", "email", "visitedAt"],
      data: data?.leads || [],
      gradient: "bg-gradient-to-r from-blue-200 to-blue-100",
      buttonColor: "bg-blue-500 hover:bg-blue-600",
    },
  });

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-lg font-medium text-gray-700">Loading dashboard...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error</h3>
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );

  const tabConfig = getTabConfig();
  const currentTab = tabConfig[tab];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Centered Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage and monitor your application data</p>
        </div>

        {/* Gradient Colorful Tabs */}
        <div className="flex space-x-4 mb-6 justify-center">
          {Object.entries(tabConfig).map(([key, config]) => (
            <button
              key={key}
              onClick={() => {
                setTab(key);
                setCurrentPage(1);
              }}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                tab === key
                  ? `ring-2 ring-blue-500 ${config.gradient}`
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow p-6">
          {renderTable(currentTab.columns, currentTab.data, currentTab.gradient)}
        </div>
      </div>
    </div>
  );
}
