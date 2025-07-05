import { useState } from "react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function VerifyEmail() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  interface OtpResponse {
    success: boolean;
    message?: string;
  }

  const sendOtp = useAuthStore(
    (state) =>
      (state as { sendOtp: (email: string) => Promise<OtpResponse> }).sendOtp
  );

  const handleSubmit = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    setLoading(true);
    const response = await sendOtp(email.trim());
    setLoading(false);

    if (response?.success) {
      toast.success(
        response.message || "Verification email sent successfully."
      );
      navigate("/verify-otp");
    } else {
      toast.error(
        response?.message ||
          "Failed to send verification email. Please try again."
      );
    }
  };

  return (
    <div className="font-sans bg-[url('@/assets/mits.png')] bg-no-repeat bg-fixed bg-center bg-cover h-screen w-full p-4 flex justify-center items-center">
      <div className="bg-white/80 rounded-2xl shadow-lg w-full sm:w-96 max-w-[90%] p-6 sm:p-7 text-center hover:shadow-xl">
        <div className="mb-3 h-20 w-20 mx-auto rounded-full">
          <img src={logo} alt="logo" className="object-cover h-full w-full" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Forget Password
        </h1>
        <p className="text-gray-600 text-sm mb-4">Verify your email</p>

        <div className="text-left space-y-1">
          <Label htmlFor="identifier" className="text-base font-medium">
            Email
          </Label>
          <Input
            type="email"
            autoComplete="off"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-10 p-3 border border-gray-300 rounded-lg"
            style={{ borderRadius: "10px" }}
          />
        </div>

        <Button
          disabled={loading}
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 mt-4 w-full rounded-2xl hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Send OTP"}
        </Button>
      </div>
    </div>
  );
}

export default VerifyEmail;
