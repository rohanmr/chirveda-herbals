import React, { useEffect, useState } from "react";
import SectionHeading from "../components/ui/SectionHeading";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const { addToCart, clearCart } = useCart();

  // ✅ Get user from localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const email = user?.email || null;

  useEffect(() => {
    if (!email) return; // no user, skip fetch

    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/orders?email=${email}`);

        // Parse items from JSON string if needed
        const ordersData = res.data.map((o) => ({
          ...o,
          items: typeof o.items === "string" ? JSON.parse(o.items) : o.items,
        }));

        setOrders(ordersData);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, [email]);

  const handleOrderAgain = (orderItems) => {
    clearCart();
    orderItems.forEach((item) => {
      addToCart({
        id: item.id,
        title: item.title,
        discountedPrice: item.discountedPrice,
        quantity: item.quantity,
        image: item.image || "/placeholder.png",
      });
    });
    navigate("/checkout");
  };

  return (
    <div className="container mx-auto my-8 px-4 sm:px-6 lg:px-8">
      <SectionHeading
        title="My"
        highlight="Orders"
        subtitle="Track your past orders and reorder easily."
      />

      {!user ? (
        <p className="text-center text-gray-500 mt-10 text-lg">
          Please login to view your orders.
        </p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500 mt-10 text-lg">
          No orders placed yet.
        </p>
      ) : (
        <div className="space-y-6 mt-6">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">
                  Order ID: <span className="font-normal">{order.orderId}</span>
                </h4>
                <span className="text-sm text-gray-500">
                  {new Date(order.date).toLocaleString()}
                </span>
              </div>

              <ul className="divide-y divide-gray-200 mb-4">
                {order.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:justify-between py-2 text-gray-700 items-start sm:items-center gap-2"
                  >
                    <div className="flex items-center gap-3">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-12 h-12 object-cover rounded-md shadow-sm"
                        />
                      )}
                      <span className="font-medium">
                        {item.title} × {item.quantity}
                      </span>
                    </div>
                    <span className="text-gray-800 font-semibold">
                      ₹{item.discountedPrice * item.quantity}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between text-gray-900 font-bold text-lg border-t pt-3 mt-2">
                <span>Total:</span>
                <span>₹{order.totalAmount}</span>
              </div>

              {order.status && (
                <div className="mt-3 text-sm">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      order.status === "Pending"
                        ? "text-yellow-600"
                        : order.status === "Confirmed"
                        ? "text-green-600"
                        : "text-gray-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              )}

              <div className="mt-4 text-right">
                <button
                  onClick={() => handleOrderAgain(order.items)}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-700 transition cursor-pointer"
                >
                  Order Again
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
