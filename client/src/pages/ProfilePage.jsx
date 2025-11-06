import React, { useEffect, useState } from "react";
import SectionHeading from "../components/ui/SectionHeading";

const ProfilePage = () => {
  const [userOrders, setUserOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Guest", email: "guest@example.com" };


  const username = user.name;
  const email = user.email;

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem("userOrders")) || [];
    const orders = allOrders.filter((order) => order.email === email);
    setUserOrders(orders.reverse()); // show latest first
  }, [email]);

  const totalOrders = userOrders.length;
  const totalSpent = userOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const lastOrder = userOrders[0];

  return (
    <div className="container mx-auto my-8 px-4 sm:px-8">
      <SectionHeading
        title="My"
        highlight="Account"
        subtitle="View your profile and dashboard summary."
      />

      <div className="bg-white shadow-lg rounded-xl p-6 max-w-3xl mx-auto mt-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-4xl font-bold text-green-700 shadow-md">
            {username.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-800">{username}</h2>
            <p className="text-gray-600">{email}</p>
            {totalOrders > 0 && lastOrder && (
              <p className="text-gray-500 text-sm mt-1">
                Last Order: {lastOrder.date}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 border-t pt-6">
          <div className="bg-green-50 rounded-xl p-6 flex flex-col items-center shadow-sm">
            <span className="text-3xl font-bold text-green-700">{totalOrders}</span>
            <span className="text-gray-600 mt-2">Total Orders</span>
          </div>

          <div className="bg-green-50 rounded-xl p-6 flex flex-col items-center shadow-sm">
            <span className="text-3xl font-bold text-green-700">₹{totalSpent}</span>
            <span className="text-gray-600 mt-2">Total Spent</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;