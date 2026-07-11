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

  // Load Current User
  const loadUser = async () => {
    try {
      const response = await getCurrentUser();

      setUser(response.data);
      setIsAuthenticated(true);
    } catch {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Register
  const register = async (formData) => {
    return await registerUser(formData);
  };

  // Login
  const login = async (credentials) => {
    const response = await loginUser(credentials);

    await loadUser();

    return response;
  };

  // Logout
  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    // The request resolves asynchronously; state is updated from its result.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        logout,
        register,
        loadUser,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom Hook
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};

export default AuthContext;
