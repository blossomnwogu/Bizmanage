import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getCurrentUser } from "../api/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // No saved token means the user is logged out.
    if (!token) {
      setLoading(false);
      return;
    }

    async function loadUser() {
      try {
        const data = await getCurrentUser();

        setUser(data);
      } catch (error) {
        console.error(
          "Failed to restore authentication:",
          error
        );

        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  // Called after successful login or signup.
  const login = (data) => {
    if (!data?.token || !data?.user) {
      console.error(
        "Invalid authentication response:",
        data
      );
      return;
    }

    localStorage.setItem("token", data.token);

    setUser(data.user);
  };

  // Called when the user clicks Logout.
  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider"
    );
  }

  return context;
}