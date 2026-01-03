import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Admin signup is disabled. Redirect to admin login.
export default function SignupPage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/admin/login');
  }, [navigate]);
  return null;
}
