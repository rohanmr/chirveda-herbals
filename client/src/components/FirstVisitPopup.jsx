import { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

export default function FirstVisitPopup({ onDiscountClaimed }) {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [claimed, setClaimed] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  useEffect(() => {
    if (!localStorage.getItem("firstVisitDone")) {
      setShowPopup(true);
    }
    if (localStorage.getItem("offerClaimed") === "yes") {
      setClaimed(true);
    }
  }, []);

  const onEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (!val) return setEmailError("");
    setEmailError(
      !emailRegex.test(val)
        ? "Enter valid Gmail only (example: abc@gmail.com)"
        : ""
    );
  };

  const claimOffer = async () => {
    if (email && !emailError) {
      try {
        await fetch("http://localhost:5000/api/leads/collect-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        localStorage.setItem("offerClaimed", "yes");
        const claimedDiscount = 15;
        localStorage.setItem("userClaimedDiscount", claimedDiscount);
        setClaimed(true);
      } catch (e) {
        console.log("Email save failed (silent)");
      }
    }
    localStorage.setItem("firstVisitDone", "yes");
  };

  const handleContinue = () => {
    setShowPopup(false);
    if (onDiscountClaimed) {
      const discount =
        Number(localStorage.getItem("userClaimedDiscount")) || 15;
      onDiscountClaimed(discount); // notify parent to refresh products
    }
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
      <div className="bg-white w-full max-w-md text-center relative rounded-xl shadow-xl overflow-hidden animate-[zoomIn_.3s_ease]">
        <button
          className="absolute top-3 right-3 text-2xl text-black/70 hover:text-black cursor-pointer"
          onClick={handleContinue}
        >
          <IoMdClose className="text-2xl" />
        </button>
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
            YOU WILL GET
          </h2>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-wider text-green-600">
            15% OFF
          </h1>
          <p className="text-xs sm:text-sm text-gray-700 mb-6">
            on your first order, use promo code:{" "}
            <span className="font-bold text-orange-600">WELCOME</span>
          </p>

          {!claimed ? (
            <>
              <input
                type="email"
                placeholder="E-mail"
                className="w-full border border-black p-3 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-black"
                value={email}
                onChange={onEmailChange}
              />
              {emailError && (
                <p className="text-red-600 text-xs mb-4">{emailError}</p>
              )}
              <button
                onClick={claimOffer}
                disabled={!!emailError || !email}
                className={`w-full text-white font-semibold py-3 rounded-md tracking-widest transition
                                ${
                                  emailError || !email
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-green-600 hover:bg-green-700"
                                }`}
              >
                CLAIM OFFER
              </button>
              <p
                className="mt-6 text-base text-black hover:text-green-600 cursor-pointer"
                onClick={handleContinue}
              >
                No Thanks
              </p>
            </>
          ) : (
            <>
              <p className="text-green-600 text-sm mb-4 flex items-center justify-center gap-1">
                <FaCheckCircle /> Offer claimed successfully!
              </p>
              <button
                onClick={handleContinue}
                className="w-full text-white font-semibold py-3 rounded-md tracking-wide bg-green-500 hover:bg-green-600"
              >
                CONTINUE
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
