import React, { useEffect, useState } from "react";
import SectionHeading from "../components/ui/SectionHeading";
import axios from "axios";

const ProfilePage = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [userAddress, setUserAddress] = useState(null); // new
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  // Get logged-in user from localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser
    ? JSON.parse(storedUser)
    : { name: "Guest", email: "guest@example.com" };
  const { name: username, email } = user;

  useEffect(() => {
    if (!email) return;

    const fetchOrders = async () => {
      try {
        // Fetch orders
        const resOrders = await axios.get(`${API_BASE_URL}/api/orders?email=${email}`);
        const ordersData = resOrders.data.map((o) => ({
          ...o,
          items: typeof o.items === "string" ? JSON.parse(o.items) : o.items,
        }));
        setUserOrders(ordersData.reverse());

        // Fetch address
        const resAddress = await axios.get(`${API_BASE_URL}/api/address/${email}`);
        if (resAddress.data.length > 0) {
          setUserAddress(resAddress.data[0]); // assuming only one address per email
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [email]);

  // Dashboard stats
  const totalOrders = userOrders.length;
  const totalSpent = userOrders.reduce(
    (sum, order) => sum + (order.totalAmount || 0),
    0
  );
  const lastOrder = userOrders[0];

  return (
    <div className="container mx-auto my-8 px-4 sm:px-6 lg:px-8">
      <SectionHeading
        title="My"
        highlight="Account"
        subtitle="View your profile and dashboard summary."
      />

      {/* User Info Card */}
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-3xl mx-auto mt-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-4xl font-bold text-green-700 shadow-md">
            {username.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-800">{username}</h2>
            <p className="text-gray-600">{email}</p>

            {/* Display address if available */}
            {userAddress && (
              <p className="text-gray-500 text-sm mt-1">
                {userAddress.fullName}, {userAddress.contactNumber} <br />
                {userAddress.addressLine}, {userAddress.city}, {userAddress.state} - {userAddress.pincode}
              </p>
            )}

          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 border-t pt-6">
          <div className="bg-green-50 rounded-xl p-6 flex flex-col items-center shadow-sm">
            <span className="text-3xl font-bold text-green-700">{totalOrders}</span>
            <span className="text-gray-600 mt-2">Total Orders</span>
          </div>

          <div className="bg-green-50 rounded-xl p-6 flex flex-col items-center shadow-sm">
            <span className="text-3xl font-bold text-green-700">₹{totalSpent.toFixed(2)}</span>
            <span className="text-gray-600 mt-2">Total Spent</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
