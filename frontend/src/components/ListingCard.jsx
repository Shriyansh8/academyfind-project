import { useState } from "react";

import PaymentModal from "./PaymentModal";

const ListingCard = ({ item }) => {
  const [showPayment, setShowPayment] =
    useState(false);

  return (
    <>

      <div className="bg-white rounded-[35px] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 border border-gray-100 group">

        {/* Image */}
        <div className="overflow-hidden relative">

          <img
            src={item.image}
            alt={item.name}
            className="w-full h-72 object-cover group-hover:scale-110 transition duration-700"
          />

          <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-lg text-yellow-600 font-black text-lg">
            ⭐ {item.rating}
          </div>

        </div>

        {/* Content */}
        <div className="p-7">

          <h2 className="text-4xl font-black text-gray-900 leading-tight group-hover:text-blue-600 transition duration-300">
            {item.name}
          </h2>

          <p className="text-gray-500 text-xl mt-4">
            📍 {item.address}
          </p>

          {/* Category + Price */}
          <div className="flex items-center justify-between mt-8">

            <span className="bg-blue-100 text-blue-700 px-5 py-3 rounded-full font-bold text-lg">
              {item.category}
            </span>

            <span className="text-4xl font-black text-green-600">
              ₹{item.fees}
            </span>

          </div>

          {/* Bottom */}
          <div className="flex justify-between items-center mt-8 text-lg">

            <span className="text-gray-500 font-medium">
              📚 Best Faculty
            </span>

            {item.distance && (

              <span className="font-black text-gray-800">
                {item.distance} km away
              </span>

            )}

          </div>

          {/* Button */}
          <button
            onClick={() =>
              setShowPayment(true)
            }
            className="w-full mt-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-5 rounded-2xl font-black text-xl hover:scale-105 transition duration-300 shadow-xl"
          >
            Enroll Now
          </button>

        </div>

      </div>

      {/* Modal */}
      {showPayment && (

        <PaymentModal
          institute={item}
          onClose={() =>
            setShowPayment(false)
          }
        />

      )}

    </>
  );
};

export default ListingCard;