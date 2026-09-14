import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Overview from "./pages/Overview";
import Sales from "./pages/Sales";
import Inventory from "./pages/Inventory";
import Expenses from "./pages/Expenses";
import Customers from "./pages/Customers";
import Records from "./pages/Records";
import Reports from "./pages/Reports";
import FinancialEducation from "./pages/FinancialEducation";
import Settings from "./pages/Settings";

import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <Routes>

      {/* =========================
          PUBLIC PAGES
      ========================= */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />


      {/* =========================
          PROTECTED APPLICATION
      ========================= */}

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/overview"
          element={<Overview />}
        />

        <Route
          path="/sales"
          element={<Sales />}
        />

        <Route
          path="/inventory"
          element={<Inventory />}
        />

        <Route
          path="/expenses"
          element={<Expenses />}
        />

        <Route
          path="/customers"
          element={<Customers />}
        />

        <Route
          path="/records"
          element={<Records />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />
        
        <Route
        path="/financial-education"
        element={<FinancialEducation />}
        />
        
        <Route
          path="/settings"
          element={<Settings />}
        />
      </Route>


      {/* =========================
          FALLBACK
      ========================= */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
}

export default App;