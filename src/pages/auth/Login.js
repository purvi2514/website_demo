import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../helpers/axios";
import endpoints from "../../helpers/endpoints";
import { setSession } from "../../helpers/dataLake";

const bg =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1470&q=80";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      try {
        setIsLoading(true);
        const res = await axios.post(endpoints.auth.login, { email, password });
        const payload = res.data && res.data.data ? res.data.data : null;
        if (!payload) throw new Error("Invalid response from server");
        const { token, user } = payload;

        const session = { token, role: user.role, user };
        if (user.role === "admin") session.adminToken = token;
        else session.userToken = token;

        setSession(session);
        navigate(user.role === "admin" ? "/admin" : "/");
      } catch (err) {
        const msg = err?.response?.data?.error?.message || err.message || "Login failed";
        alert(msg);
      } finally {
        setIsLoading(false);
      }
    })();
  };

  return (
    <div className="flex">
      {/* LEFT IMAGE SECTION */}
      <div
        className="hidden lg:flex w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="absolute bottom-8 left-8 text-white">
          <p className="text-lg font-light">Journey Beyond</p>
        </div>
      </div>

      {/* RIGHT LOGIN SECTION */}
      <div className="w-full py-12 lg:w-1/2 bg-[#111] flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8">
            <h2 className="text-white font-bold tracking-widest text-sm">
              BIKE HUB
            </h2>
          </div>

          <h1 className="text-3xl font-semibold text-white mb-8">
            PLEASE LOG IN
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#2a2a2a] text-white px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-600"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#2a2a2a] text-white px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-600"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 transition text-white font-semibold py-3"
            >
              {isLoading ? "LOGGING IN..." : "LOGIN"}
            </button>

            <div className="text-center text-sm text-gray-400 mt-4 flex">

              <span>Don't have an account? </span>
              <Link to="/signup" className="text-red-500 ml-2 font-medium hover:underline">
                Sign up
              </Link>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
