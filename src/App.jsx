import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Overview from "./pages/Overview";
import AppLayout from "./layouts/Applayout";
import Sales from "./pages/Sales";
import Inventory from "./pages/Inventory";
import Expenses from "./pages/Expenses";
import Customers from "./pages/Customers";
import Records from "./pages/Records";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/overview"
        element={
          <AppLayout>
            <Overview />
          </AppLayout>
        }
      />

      <Route
      path="/sales"
      element={
        <AppLayout>
          <Sales />
        </AppLayout>
      }
    />

      <Route
      path="/inventory"
      element={
        <AppLayout>
          <Inventory />
        </AppLayout>
      }
    />

    <Route
    path="/expenses"
    element={
      <AppLayout>
        <Expenses />
      </AppLayout>
    }
    />

    <Route
    path="/customers"
    element={
      <AppLayout>
        <Customers />
      </AppLayout>
    }
    />

    <Route
    path="/records"
    element={
      <AppLayout>
        <Records />
      </AppLayout>
    }
    />

    <Route
    path="/reports"
    element={
      <AppLayout>
        <Reports />
      </AppLayout>
    }
    />

    <Route
    path="/settings"
    element={
      <AppLayout>
        <Settings />
      </AppLayout>
    }
    />

    </Routes>
  );
}

export default App;