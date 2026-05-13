import Listing from "../models/Listing.js";

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

  return (R * c).toFixed(2);
};

export const getListings =
  async (req, res) => {
    try {
      const {
        search,
        category,
        userLat,
        userLng,
      } = req.query;

      let query = {};

      if (search) {
        query.name = {
          $regex: search,
          $options: "i",
        };
      }

      if (category) {
        query.category = category;
      }

      let listings =
        await Listing.find(query);

      if (userLat && userLng) {
        listings = listings.map(
          (item) => ({
            ...item._doc,

            distance:
              calculateDistance(
                userLat,
                userLng,
                item.lat,
                item.lng
              ),
          })
        );
      }

      res.json(listings);
    } catch (error) {
      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };