import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  loginUser,
  logoutUser,
  registerUser,
  getCurrentUser,
} from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // -----------------------------
  // Load Logged In User
  // -----------------------------
  const loadUser = async () => {
    try {
      setLoading(true);

      const response = await getCurrentUser();

      setUser(response.data);

      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);

      setUser(null);

      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Register
  // -----------------------------
  const register = async (formData) => {
    const response = await registerUser(formData);

    return response;
  };

  // -----------------------------
  // Login
  // -----------------------------
  const login = async (credentials) => {
    const response = await loginUser(credentials);

    await loadUser();

    return response;
  };

  // -----------------------------
  // Logout
  // -----------------------------
  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      setUser(null);

      setIsAuthenticated(false);
    }
  };

  // -----------------------------
  // On App Load
  // -----------------------------
  useEffect(() => {
    loadUser();
  }, []);

  const value = {
    user,

    loading,

    isAuthenticated,

    login,

    logout,

    register,

    loadUser,

    setUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;