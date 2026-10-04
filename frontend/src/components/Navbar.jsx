import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaWallet,
  FaHome,
  FaMoneyBillWave,
  FaChartPie,
  FaChartLine,
  FaSignOutAlt,
} from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navLink = (path) =>
    `flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 font-medium ${
      location.pathname === path
        ? "bg-[var(--primary)] text-white shadow-[var(--shadow-sm)]"
        : "text-[var(--text-secondary)] hover:bg-[var(--primary-light)] hover:text-[var(--primary)]"
    }`;

  return (
    <nav
      className="
        sticky top-0 z-50
        bg-[var(--surface)]
        border-b border-[var(--border)]
        shadow-[var(--shadow-sm)]
        backdrop-blur-md
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}

        <Link
          to="/dashboard"
          className="flex items-center gap-3 hover:opacity-90 transition"
        >
          <div
            className="
              w-12 h-12
              rounded-2xl
              bg-[var(--primary)]
              flex items-center justify-center
              text-white
              shadow-[var(--shadow-sm)]
            "
          >
            <FaWallet size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
              MoneyMate
            </h1>

            <p className="text-xs text-[var(--text-secondary)]">
              Smart Expense Management
            </p>
          </div>
        </Link>

        {/* Navigation */}

        <div className="flex items-center gap-2">

          <Link to="/dashboard" className={navLink("/dashboard")}>
            <FaHome />
            <span>Dashboard</span>
          </Link>

          <Link to="/expenses" className={navLink("/expenses")}>
            <FaWallet />
            <span>Expenses</span>
          </Link>

          <Link to="/income" className={navLink("/income")}>
            <FaMoneyBillWave />
            <span>Income</span>
          </Link>

          <Link to="/categories" className={navLink("/categories")}>
            <FaChartPie />
            <span>Categories</span>
          </Link>

          <Link to="/monthly" className={navLink("/monthly")}>
            <FaChartLine />
            <span>Monthly</span>
          </Link>

          <button
            onClick={handleLogout}
            className="
              flex items-center gap-2
              px-4 py-2
              rounded-xl
              font-medium
              text-white
              bg-[var(--danger)]
              hover:opacity-90
              transition-all
              duration-200
              shadow-[var(--shadow-sm)]
            "
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;