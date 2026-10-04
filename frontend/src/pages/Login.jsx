import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { FaEnvelope, FaLock, FaWallet } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      const response = await API.post("/auth/login", formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Invalid email or password"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-slate-100 to-indigo-100 flex items-center justify-center p-6">

      <div className="max-w-6xl w-full grid lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* LEFT SECTION */}

        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-12">

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
            Manage your finances with confidence.
          </h2>

          <p className="mt-6 text-blue-100 leading-8">
            Track income, manage expenses, visualize analytics,
            and soon receive AI-powered financial insights to
            help you save more every month.
          </p>
        </div>

        {/* RIGHT SECTION */}

        <div className="p-10 lg:p-14">

          <h2 className="text-4xl font-bold text-gray-800">
            Welcome Back 👋
          </h2>

          <p className="text-gray-500 mt-2 mb-8">
            Sign in to continue using MoneyMate.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* EMAIL */}

            <div>
              <label className="text-gray-700 font-medium">
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
              <label className="text-gray-700 font-medium">
                Password
              </label>

              <div className="flex items-center border rounded-xl px-4 mt-2 focus-within:ring-2 focus-within:ring-blue-500">
                <FaLock className="text-gray-400" />

                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 outline-none"
                />
              </div>
            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white py-3 rounded-xl font-semibold"
            >
              Sign In
            </button>

          </form>

          <p className="text-center text-gray-600 mt-8">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Create one
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;