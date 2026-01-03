import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // seconds

      if (decoded.exp && decoded.exp < currentTime) {
        // 🚫 Token expired
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setExpired(true);
      } else {
        // ✅ Token valid
        const storedUser = localStorage.getItem("user");
        setUser(storedUser ? JSON.parse(storedUser) : { id: decoded.id });
        setExpired(false);
      }
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setExpired(true);
    }
  }, []);

  return { user, expired };
}
