import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/">

          <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition duration-300">
            AcademyFind
          </h1>

        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {user ? (

            <>
              <span className="font-semibold text-gray-700">
                Hi, {user.name}
              </span>

              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl font-semibold transition duration-300"
              >
                Logout
              </button>
            </>

          ) : (

            <>
              <Link to="/login">

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold transition duration-300">
                  Login
                </button>

              </Link>

              <Link to="/register">

                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold transition duration-300">
                  Register
                </button>

              </Link>
            </>

          )}

        </div>

      </div>

    </nav>
  );
};

export default Navbar;