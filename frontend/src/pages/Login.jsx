import { useState } from "react";
import axios from "axios";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";

const API =
  import.meta.env.VITE_API_URL;

const Login = () => {
  const navigate =
    useNavigate();

  const { login } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const submitHandler = async (
    e
  ) => {
    e.preventDefault();

    try {
      const { data } =
        await axios.post(
          `${API}/auth/login`,
          {
            email,
            password,
          }
        );

      login(data);

      navigate("/");
    } catch (error) {
      alert(
        error.response.data.message
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f7fb] px-6">

      <form
        onSubmit={submitHandler}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md"
      >

        <h1 className="text-4xl font-black text-center mb-8 text-blue-600">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full p-4 border rounded-2xl mb-5"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full p-4 border rounded-2xl mb-6"
          required
        />

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl font-bold transition duration-300">
          Login
        </button>

        <p className="text-center mt-6 text-gray-500">
          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-blue-600 font-bold"
          >
            Register
          </Link>

        </p>

      </form>

    </div>
  );
};

export default Login;