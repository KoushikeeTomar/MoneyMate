import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import {
  FaWallet,
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post(
        "/auth/register",
        formData
      );

      alert(response.data.message);

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-slate-100 to-indigo-100 flex items-center justify-center p-6">

      <div className="max-w-6xl w-full grid lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* LEFT SIDE */}

        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-indigo-700 to-blue-600 text-white p-12">

          <div className="flex items-center gap-4 mb-8">
            <FaWallet className="text-5xl" />

            <div>
              <h1 className="text-4xl font-bold">
                MoneyMate
              </h1>

              <p className="text-blue-100">
                Track Smart. Save Smarter.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold leading-snug">
            Start your financial journey today.
          </h2>

          <p className="mt-6 text-blue-100 leading-8">
            Organize your income, monitor expenses,
            visualize spending trends, and unlock AI-powered
            financial insights with MoneyMate.
          </p>

        </div>

        {/* RIGHT SIDE */}

        <div className="p-10 lg:p-14">

          <h2 className="text-4xl font-bold text-gray-800">
            Create Account 🚀
          </h2>

          <p className="text-gray-500 mt-2 mb-8">
            Join MoneyMate and take control of your finances.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* NAME */}

            <div>

              <label className="font-medium text-gray-700">
                Full Name
              </label>

              <div className="flex items-center border rounded-xl px-4 mt-2 focus-within:ring-2 focus-within:ring-blue-500">

                <FaUser className="text-gray-400" />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 outline-none"
                />

              </div>

            </div>

            {/* EMAIL */}

            <div>

              <label className="font-medium text-gray-700">
                Email
              </label>

              <div className="flex items-center border rounded-xl px-4 mt-2 focus-within:ring-2 focus-within:ring-blue-500">

                <FaEnvelope className="text-gray-400" />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 outline-none"
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div>

              <label className="font-medium text-gray-700">
                Password
              </label>

              <div className="flex items-center border rounded-xl px-4 mt-2 focus-within:ring-2 focus-within:ring-blue-500">

                <FaLock className="text-gray-400" />

                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 outline-none"
                />

              </div>

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 text-white py-3 rounded-xl font-semibold"
            >
              Create Account
            </button>

          </form>

          <p className="text-center mt-8 text-gray-600">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign In
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;