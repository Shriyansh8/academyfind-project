import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

const MapView = ({
  listings,
  userLocation,
}) => {
  return (
    <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200 sticky top-24">

      <MapContainer
        center={
          userLocation
            ? [
                userLocation.lat,
                userLocation.lng,
              ]
            : [28.6139, 77.209]
        }
        zoom={11}
        style={{
          height: "620px",
          width: "100%",
        }}
      >

        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User Marker */}
        {userLocation && (

          <Marker
            position={[
              userLocation.lat,
              userLocation.lng,
            ]}
          >

            <Popup>
              Your Current Location
            </Popup>

          </Marker>

        )}

        {/* Institute Markers */}
        {listings.map((item, index) => (

          <Marker
            key={index}
            position={[
              item.lat,
              item.lng,
            ]}
          >

            <Popup>

              <div className="w-56">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-28 object-cover rounded-xl mb-3"
                />

                <h2 className="font-bold text-lg">
                  {item.name}
                </h2>

                <p className="text-gray-600 text-sm mt-1">
                  {item.address}
                </p>

                <div className="flex justify-between mt-3">

                  <span className="text-green-600 font-bold">
                    ₹{item.fees}
                  </span>

                  <span>
                    ⭐ {item.rating}
                  </span>

                </div>

              </div>

            </Popup>

          </Marker>

        ))}

      </MapContainer>

    </div>
  );
};

export default MapView;