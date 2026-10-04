
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Expenses from "./pages/Expenses";
import Income from "./pages/Income";
import Dashboard from "./pages/Dashboard";
import CategoryAnalytics from "./pages/CategoryAnalytics";
import MonthlyAnalytics from "./pages/MonthlyAnalytics";
import { useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  const location = useLocation();
  const hideNavbar =
  location.pathname === "/login" ||location.pathname === "/register";

  return (

    <div>

      {/* NAVBAR */}

      {
  !hideNavbar && <Navbar />
}

      {/* ROUTES */}

      <Routes>

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/expenses"
          element={
    <ProtectedRoute>
      <Expenses />
    </ProtectedRoute>
  }
        />

        <Route
          path="/income"
          element={
    <ProtectedRoute>
      <Income />
    </ProtectedRoute>
  }
        />

        <Route
          path="/dashboard"
          element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
        />

        <Route
          path="/categories"
          element={
    <ProtectedRoute>
      <CategoryAnalytics />
    </ProtectedRoute>
  }
        />

        <Route
          path="/monthly"
          element={
    <ProtectedRoute>
      <MonthlyAnalytics/>
    </ProtectedRoute>
  }
        />

      </Routes>

    </div>

  );

}

export default App;

// import Register from "./pages/Register";
// import Login from "./pages/Login";


// function App() {

//   return (
//     <div>
//       <Register />
//       <Login />
//     </div>
//   );

// }

// export default App;