import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

interface UseAuthStore {
  isLoggedIn: boolean;
}

const PUBLIC_ROUTES = ["/login", "/sign-up", "/forgot-password","/verify-otp", "/reset-password"];

function getCookie(name: string) {
  // More robust cookie parsing
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift();
    return cookieValue ? decodeURIComponent(cookieValue) : null;
  }
  return null;
}

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isLoggedIn = useAuthStore(
    (state) => (state as UseAuthStore).isLoggedIn
  );
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    const isPublic = PUBLIC_ROUTES.includes(location.pathname);
    const isAuthenticated = isLoggedIn || !!accessToken;


    // If authenticated and trying to access public routes (login/signup), redirect to home
    if (isAuthenticated && isPublic) {
      navigate("/", { replace: true });
      return;
    }

    // If not authenticated and trying to access private routes, redirect to login
      if (!isAuthenticated && !isPublic) {
      navigate("/login", { replace: true });
      return;
    }
  }, [isLoggedIn, location.pathname, navigate]);

  return <>{children}</>;
};

export default AuthProvider;