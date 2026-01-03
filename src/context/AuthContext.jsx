import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [expired, setExpired] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("taz_admin");

    if (!token) {
      setUser(null);
      setExpired(false);
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp && decoded.exp < currentTime) {
        localStorage.removeItem("taz_admin");
        localStorage.removeItem("user");
        setUser(null);
        setExpired(true);
      } else {
        const storedUser = localStorage.getItem("user");
        setUser(storedUser ? JSON.parse(storedUser) : decoded);
        setExpired(false);
      }
    } catch (err) {
      localStorage.removeItem("taz_admin");
      localStorage.removeItem("user");
      setUser(null);
      setExpired(true);
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, expired, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
