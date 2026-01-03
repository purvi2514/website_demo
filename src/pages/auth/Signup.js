import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../helpers/axios";
import endpoints from "../../helpers/endpoints";
import { setSession } from "../../helpers/dataLake";

const bg =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1470&q=80";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      try {
        setIsLoading(true);
        const { name, email, password, confirmPassword, agreeToTerms } = formData;

        if (!name || !email || !password || !confirmPassword) {
          alert("Please fill in all fields!");
          setIsLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          setIsLoading(false);
          return;
        }
        if (!agreeToTerms) {
          alert("You must agree to the Terms and Conditions!");
          setIsLoading(false);
          return;
        }

        // Call signup API
        await axios.post(endpoints.auth.signup, { name, email, password });

        // Auto-login after signup to obtain token
        const loginRes = await axios.post(endpoints.auth.login, { email, password });
        const payload = loginRes.data && loginRes.data.data ? loginRes.data.data : null;
        if (!payload) throw new Error("Signup succeeded but login failed");
        const { token, user } = payload;

        const session = { token, role: user.role, user };
        if (user.role === "admin") session.adminToken = token;
        else session.userToken = token;
        setSession(session);

        navigate(user.role === "admin" ? "/admin" : "/");
      } catch (err) {
        const msg = err?.response?.data?.error?.message || err.message || "Signup failed";
        alert(msg);
      } finally {
        setIsLoading(false);
      }
    })();
  };

  return (
    <div className=" flex">
      {/* LEFT IMAGE SECTION */}
      <div
        className="hidden lg:flex w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="absolute bottom-8 left-8 text-white">
          <p className="text-lg font-light">Journey Beyond</p>
        </div>
      </div>

      {/* RIGHT SIGNUP SECTION */}
      <div className="w-full py-12 lg:w-1/2 bg-[#111] flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8">
            <h2 className="text-white font-bold tracking-widest text-sm">
              FERRARI
            </h2>
          </div>

          <h1 className="text-3xl font-semibold text-white mb-8">
            CREATE ACCOUNT
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-[#2a2a2a] text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-[#2a2a2a] text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full bg-[#2a2a2a] text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
            />

            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full bg-[#2a2a2a] text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
            />

            <label className="flex items-start gap-2 text-sm text-gray-400">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="mt-1 accent-red-600"
              />
              <span>
                I agree to the{" "}
                <span className="text-white hover:underline cursor-pointer">
                  Terms & Conditions
                </span>
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 transition text-white font-semibold py-3"
            >
              {isLoading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
            </button>

            <div className="text-center text-sm text-gray-400 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-white hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
