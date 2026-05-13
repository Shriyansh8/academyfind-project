import { useState } from "react";

const PaymentModal = ({
  institute,
  onClose,
}) => {
  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const handlePayment = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      setSuccess(true);

      const previousEnrollments =
        JSON.parse(
          localStorage.getItem(
            "academyEnrollments"
          )
        ) || [];

      localStorage.setItem(
        "academyEnrollments",
        JSON.stringify([
          ...previousEnrollments,
          institute,
        ])
      );
    }, 2500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center px-6">

      <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-lg p-10 relative animate-fadeIn">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-2xl font-bold text-gray-500 hover:text-red-500 transition"
        >
          ×
        </button>

        {!success ? (

          <>

            <h2 className="text-4xl font-black text-gray-900 mb-3">
              Complete Enrollment
            </h2>

            <p className="text-gray-500 text-lg mb-8">
              Secure your admission instantly.
            </p>

            {/* Institute */}
            <div className="bg-blue-50 rounded-3xl p-5 mb-8 border border-blue-100">

              <h3 className="text-2xl font-bold text-blue-700">
                {institute.name}
              </h3>

              <p className="text-gray-600 mt-2">
                {institute.address}
              </p>

              <div className="mt-4 text-3xl font-black text-green-600">
                ₹{institute.fees}
              </div>

            </div>

            {/* Card */}
            <input
              type="text"
              placeholder="Card Number"
              className="w-full p-5 rounded-2xl border border-gray-300 mb-5 outline-none focus:border-blue-500"
            />

            {/* UPI */}
            <input
              type="text"
              placeholder="UPI ID"
              className="w-full p-5 rounded-2xl border border-gray-300 mb-8 outline-none focus:border-blue-500"
            />

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:scale-105 transition duration-300 text-white py-5 rounded-2xl font-bold text-xl shadow-xl"
            >

              {loading
                ? "Processing Payment..."
                : `Pay ₹${institute.fees}`}

            </button>

          </>

        ) : (

          <div className="text-center py-10">

            <div className="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 text-5xl">
              ✅
            </div>

            <h2 className="text-5xl font-black text-gray-900 mb-5">
              Payment Successful
            </h2>

            <p className="text-xl text-gray-500 mb-10">
              Enrollment completed successfully.
            </p>

            <button
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold text-lg"
            >
              Continue
            </button>

          </div>

        )}

      </div>

    </div>
  );
};

export default PaymentModal;