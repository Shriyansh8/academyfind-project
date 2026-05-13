import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    category: String,
    fees: Number,
    rating: Number,
    image: String,
    lat: Number,
    lng: Number,
  },
  {
    timestamps: true,
  }
);

const Listing = mongoose.model(
  "Listing",
  listingSchema
);

export default Listing;