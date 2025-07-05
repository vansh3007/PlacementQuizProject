import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import google from "@/assets/google.png";
import { Button } from "@/components/ui/button";

interface GoogleUser {
  email: string;
  family_name: string;
  given_name: string;
  hd: string;
  id: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

interface UseAuthStore {
  googlelogin: (
    code: string,
    navigate: (path: string) => void
  ) => Promise<boolean>;
  googleUser: GoogleUser;
}

import { useAuthStore } from "@/store/useAuthStore";
const GoogleLogin: React.FC = () => {
  const googlelogin = useAuthStore(
    (state: unknown) => (state as UseAuthStore).googlelogin
  );

  const navigate = useNavigate();

  const handleSuccess = async (authResult: { code: string }) => {
    await googlelogin(authResult.code, navigate);
  };


  const googleLogin = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: (err) => console.error("Google Login Error:", err),
    flow: "auth-code",
  });

  return (
    <Button
      onClick={googleLogin}
      className="flex items-center justify-center bg-white text-black border border-gray-300 rounded-[8px] text-sm px-4 py-2 hover:bg-gray-100"
    >
      <img src={google} alt="google-icon" className="w-5 h-5 mr-2" />
      Login with Google
    </Button>
  );
};

export default GoogleLogin;
