// import React, { useState, useEffect } from "react";
// import { useCart } from "../context/CartContext";
// import SectionHeading from "../components/ui/SectionHeading";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// const CheckoutPage = () => {
//   const { cartItems, clearCart } = useCart();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [paymentCancelled, setPaymentCancelled] = useState(false);
//   const [address, setAddress] = useState(null); // new state

//   const API_BASE_URL = import.meta.env.VITE_API_URL;
//   const buyNowProduct = location.state?.buyNowProduct;
//   const itemsToShow = buyNowProduct ? [buyNowProduct] : cartItems;

//   const totalAmount = itemsToShow.reduce(
//     (sum, item) => sum + item.discountedPrice * item.quantity,
//     0
//   );

//   const storedUser = localStorage.getItem("user");
//   const user = storedUser ? JSON.parse(storedUser) : null;
//   const email = user?.email || "";
//   const userId = user?.id || null;

//   // Load Razorpay script
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     document.body.appendChild(script);
//   }, []);

//   // Check for saved address
//   useEffect(() => {
//     const savedAddress = localStorage.getItem("userAddress");
//     if (!savedAddress) {
//       // No address → navigate to AddressPage
//       navigate("/address", { state: { cartItems, buyNowProduct } });
//     } else {
//       setAddress(JSON.parse(savedAddress));
//     }
//   }, [cartItems, buyNowProduct, navigate]);

//   const startRazorpayPayment = async () => {
//     if (!address) return; // safety check
//     setLoading(true);
//     try {
//       const res = await axios.post(`${API_BASE_URL}/api/payment/create-order`, {
//         amount: totalAmount,
//         items: itemsToShow,
//         email,
//         userId,
//       });

//       const { razorpayOrder } = res.data;
//       if (!razorpayOrder) return;

//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//         amount: razorpayOrder.amount,
//         currency: "INR",
//         name: "Chirveda Herbals",
//         description: "Order Payment",
//         order_id: razorpayOrder.id,
//         prefill: { email },
//         theme: { color: "#0F9D58" },
//         handler: async function (response) {
//           const verifyRes = await axios.post(`${API_BASE_URL}/api/payment/verify-payment`, {
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//             userId,
//           });

//           if (verifyRes.data.success) {
//             clearCart();
//             navigate("/order-confirmation", {
//               state: {
//                 orderId: verifyRes.data.order.orderId,
//                 totalAmount,
//                 items: itemsToShow,
//                 address,
//               },
//             });
//           }
//         },
//         modal: {
//           ondismiss: function () {
//             setPaymentCancelled(true);
//           },
//         },
//       };

//       const paymentObject = new window.Razorpay(options);
//       paymentObject.open();
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!address) {
//     // Optional: show loading while redirecting to address page
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <p className="text-gray-600 text-lg">Loading address...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto my-8 md:my-16 px-4 sm:px-8">
//       <SectionHeading
//         title="Secure"
//         highlight="Checkout"
//         subtitle="Review your order and complete your payment safely."
//       />

//       {/* Order Summary */}
//       <div className="bg-white shadow-lg rounded-xl p-6 max-w-2xl mx-auto">
//         <h3 className="text-xl font-semibold mb-4 text-gray-800">
//           Order Summary
//         </h3>

//         <ul className="divide-y divide-gray-200 mb-4">
//           {itemsToShow.map((item) => (
//             <li key={item.id} className="flex justify-between py-3 text-gray-700">
//               <span>{item.title} × {item.quantity}</span>
//               <span>₹{item.discountedPrice * item.quantity}</span>
//             </li>
//           ))}
//         </ul>

//         <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-3">
//           <span>Total:</span>
//           <span>₹{totalAmount}</span>
//         </div>

//         <button
//           onClick={startRazorpayPayment}
//           disabled={loading}
//           className={`w-full mt-6 px-6 py-3 rounded-lg text-white font-semibold shadow-md ${
//             loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
//           }`}
//         >
//           {loading ? "Processing..." : "Continue to Payment"}
//         </button>
//       </div>

//       {/* PAYMENT CANCELLED POPUP */}
//       {paymentCancelled && (
//         <div className="fixed inset-0 bg-white bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center border border-[#F7C948] relative">
//             <button
//               onClick={() => setPaymentCancelled(false)}
//               className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
//             >
//               ✕
//             </button>

//             <h2 className="text-xl font-bold text-[#0F9D58] mb-2">
//               Payment Cancelled
//             </h2>

//             <p className="text-gray-700 mb-5 text-sm">
//               You cancelled the payment. Continue shopping or return to checkout.
//             </p>

//             <button
//               onClick={() => navigate("/products")}
//               className="w-full mb-3 bg-[#0F9D58] hover:bg-green-700 text-white py-2 rounded-xl font-medium shadow-sm"
//             >
//               Continue Shopping
//             </button>

//             <button
//               onClick={() => setPaymentCancelled(false)}
//               className="w-full bg-[#F7C948] hover:bg-yellow-400 text-gray-900 py-2 rounded-xl font-medium shadow-sm"
//             >
//               Back to Checkout
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CheckoutPage;



import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import SectionHeading from "../components/ui/SectionHeading";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";

const CheckoutPage = () => {
  const { cartItems, clearCart, removeFromCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentCancelled, setPaymentCancelled] = useState(false);
  const [address, setAddress] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const buyNowProduct = location.state?.buyNowProduct;
  const itemsToShow = buyNowProduct ? [buyNowProduct] : cartItems;

  const totalAmount = itemsToShow.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
    0
  );

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const email = user?.email || "";
  const userId = user?.id || null;

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Check for saved address
  useEffect(() => {
    const savedAddress = localStorage.getItem("userAddress");
    if (!savedAddress) {
      navigate("/address", { state: { cartItems, buyNowProduct } });
    } else {
      setAddress(JSON.parse(savedAddress));
    }
  }, [cartItems, buyNowProduct, navigate]);

  const startRazorpayPayment = async () => {
    if (!address) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/payment/create-order`, {
        amount: totalAmount,
        items: itemsToShow,
        email,
        userId,
      });

      const { razorpayOrder } = res.data;
      if (!razorpayOrder) return;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "Chirveda Herbals",
        description: "Order Payment",
        order_id: razorpayOrder.id,
        prefill: { email },
        theme: { color: "#0F9D58" },
        handler: async function (response) {
          const verifyRes = await axios.post(`${API_BASE_URL}/api/payment/verify-payment`, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            userId,
          });

          if (verifyRes.data.success) {
            clearCart();
            navigate("/order-confirmation", {
              state: {
                orderId: verifyRes.data.order.orderId,
                totalAmount,
                items: itemsToShow,
                address,
              },
            });
          }
        },
        modal: {
          ondismiss: function () {
            setPaymentCancelled(true);
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!address) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading address...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8 md:my-16 px-4 sm:px-8">
      <SectionHeading
        title="Secure"
        highlight="Checkout"
        subtitle="Review your order and complete your payment safely."
      />

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Items Section */}
        <div className="flex-1 bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-100">
          <ul className="divide-y divide-gray-200">
            {itemsToShow.map((item) => (
              <li key={item.id} className="flex flex-col sm:flex-row justify-between items-center py-4 hover:bg-gray-50 transition rounded-xl px-2 sm:px-4 gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-gray-200"
                  />
                  <div className="flex flex-col w-full">
                    <h3 className="font-semibold text-gray-800 text-base sm:text-lg md:text-xl leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-500 mt-1">
                      ₹{item.discountedPrice} × {item.quantity}
                    </p>
                    <p className="font-semibold text-green-600 text-base sm:text-lg">
                      ₹{item.discountedPrice * item.quantity}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="hidden md:flex text-red-600 hover:text-red-800 cursor-pointer font-semibold"
                >
                  <FaTrashAlt className="text-2xl" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3 bg-white shadow-xl rounded-2xl p-6 sm:p-8 h-fit sticky top-28 border border-gray-100">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">
            Order Summary
          </h3>

          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium">₹{totalAmount}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-3">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>

          <button
            onClick={startRazorpayPayment}
            disabled={loading}
            className={`w-full mt-6 py-3 rounded-xl text-white font-semibold shadow-md ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Processing..." : "Continue to Payment"}
          </button>
        </div>
      </div>

      {/* PAYMENT CANCELLED POPUP */}
      {paymentCancelled && (
        <div className="fixed inset-0 bg-white bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center border border-[#F7C948] relative">
            <button
              onClick={() => setPaymentCancelled(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-[#0F9D58] mb-2">
              Payment Cancelled
            </h2>

            <p className="text-gray-700 mb-5 text-sm">
              You cancelled the payment. Continue shopping or return to checkout.
            </p>

            <button
              onClick={() => navigate("/products")}
              className="w-full mb-3 bg-[#0F9D58] hover:bg-green-700 text-white py-2 rounded-xl font-medium shadow-sm"
            >
              Continue Shopping
            </button>

            <button
              onClick={() => setPaymentCancelled(false)}
              className="w-full bg-[#F7C948] hover:bg-yellow-400 text-gray-900 py-2 rounded-xl font-medium shadow-sm"
            >
              Back to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;

