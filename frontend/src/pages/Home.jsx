import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import MapView from "../components/MapView";

const listingsData = [
  {
    name: "Apex IIT Academy",
    address: "Sector 62, Noida",
    category: "IIT-JEE",
    fees: "85000",
    rating: 4.8,
    lat: 28.6280,
    lng: 77.3649,
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
  },

  {
    name: "Future NEET Institute",
    address: "Sector 18, Noida",
    category: "NEET",
    fees: "70000",
    rating: 4.5,
    lat: 28.5706,
    lng: 77.3272,
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
  },

  {
    name: "Medical Achievers",
    address: "Sector 22, Noida",
    category: "NEET",
    fees: "65000",
    rating: 4.4,
    lat: 28.5921,
    lng: 77.3360,
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
  },

  {
    name: "CodeMasters Academy",
    address: "Sector 15, Noida",
    category: "Coding",
    fees: "50000",
    rating: 4.7,
    lat: 28.5837,
    lng: 77.3100,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
  },
];

const Home = () => {
  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const [userLocation, setUserLocation] =
    useState(null);

  const [listings, setListings] =
    useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      }
    );
  }, []);

  useEffect(() => {
    let filtered = listingsData;

    if (search) {
      filtered = filtered.filter((item) =>
        item.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      filtered = filtered.filter(
        (item) =>
          item.category === category
      );
    }

    if (userLocation) {
      filtered = filtered.map((item) => {
        const distance =
          calculateDistance(
            userLocation.lat,
            userLocation.lng,
            item.lat,
            item.lng
          );

        return {
          ...item,
          distance: distance.toFixed(2),
        };
      });
    }

    setListings(filtered);
  }, [search, category, userLocation]);

  const calculateDistance = (
    lat1,
    lon1,
    lat2,
    lon2
  ) => {
    const R = 6371;

    const dLat =
      ((lat2 - lat1) * Math.PI) / 180;

    const dLon =
      ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) *
        Math.sin(dLat / 2) +
      Math.cos(
        (lat1 * Math.PI) / 180
      ) *
        Math.cos(
          (lat2 * Math.PI) / 180
        ) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c =
      2 *
      Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
      );

    return R * c;
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb]">

      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="text-center mb-14">

          <h1 className="text-6xl font-black text-gray-900 leading-tight">
            Discover The Best
            <span className="block text-blue-600">
              Coaching Institutes
            </span>
          </h1>

          <p className="mt-6 text-xl text-gray-500 max-w-3xl mx-auto">
            Compare coaching institutes with
            real-time distance calculation,
            maps and smart filters.
          </p>

        </div>

        {/* Search */}
        <div className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-100 mb-14">

          <input
            type="text"
            placeholder="Search coaching institutes..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full p-6 rounded-3xl border-4 border-blue-100 focus:border-blue-500 outline-none text-2xl font-medium transition duration-300"
          />

          <div className="mt-6">

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="p-5 rounded-2xl border border-gray-300 text-xl font-medium outline-none"
            >

              <option value="All">
                All Categories
              </option>

              <option value="IIT-JEE">
                IIT-JEE
              </option>

              <option value="NEET">
                NEET
              </option>

              <option value="Coding">
                Coding
              </option>

            </select>

          </div>

        </div>

        {/* Cards + Map */}
        <div className="grid lg:grid-cols-3 gap-10">

          {/* Left */}
          <div className="lg:col-span-2">

            {listings.length > 0 ? (

              <div className="grid md:grid-cols-2 gap-10">

                {listings.map(
                  (item, index) => (
                    <ListingCard
                      key={index}
                      item={item}
                    />
                  )
                )}

              </div>

            ) : (

              <div className="bg-white rounded-[40px] p-20 text-center shadow-lg">

                <h2 className="text-6xl font-black text-gray-800">
                  No Institutes Found
                </h2>

                <p className="text-2xl text-gray-500 mt-5">
                  Try changing search or
                  filters.
                </p>

              </div>

            )}

          </div>

          {/* Right */}
          <div>

            <MapView
              listings={listings}
              userLocation={userLocation}
            />

          </div>

        </div>

      </section>

    </div>
  );
};

export default Home;