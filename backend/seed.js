import mongoose from "mongoose";
import dotenv from "dotenv";

import Listing from "./models/Listing.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const listings = [
  {
    name: "Apex IIT Academy",
    address: "Sector 62, Noida",
    category: "IIT-JEE",
    fees: 85000,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
    lat: 28.628,
    lng: 77.364,
  },

  {
    name: "Future NEET Institute",
    address: "Sector 18, Noida",
    category: "NEET",
    fees: 70000,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    lat: 28.57,
    lng: 77.32,
  },
];

const importData = async () => {
  try {
    await Listing.deleteMany();

    await Listing.insertMany(listings);

    console.log("Data Imported");

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

importData();