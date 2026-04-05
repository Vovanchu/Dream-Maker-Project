/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import { useNavigate } from "react-router-dom";

export default function GoogleCallback() {
  const { login, role } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogin = async () => {
      await login();
    };
    handleLogin();
  }, []);

  useEffect(() => {
    if (role) {
      navigate(role === "admin" ? "/admin" : "/dashboard");
    }
  }, [role]);

  return <p className="text-center mt-12">Logging in with Google...</p>;
}
