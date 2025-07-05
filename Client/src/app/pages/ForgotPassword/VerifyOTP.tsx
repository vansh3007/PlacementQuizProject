import { useState, useRef } from "react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

function VerifyOTP() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();

  interface OtpVerifyResponse {
    success: boolean;
    message?: string;
  }

  const verifyOtp = useAuthStore(
    (state) =>
      (state as { verifyOtp: (otp: string) => Promise<OtpVerifyResponse> })
        .verifyOtp
  );

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);


    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const fullOtp = otp.join("");
    if (fullOtp.length < 6) {
      toast.error("Please enter the 6-digit OTP.");
      return;
    }

    setLoading(true);
    const response = await verifyOtp(fullOtp);
    setLoading(false);

    if (response?.success) {
      toast.success(response.message || "OTP verified successfully.");
      navigate("/reset-password");
    } else {
      toast.error(response?.message || "Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="font-sans bg-[url('@/assets/mits.png')] bg-no-repeat bg-fixed bg-center bg-cover h-screen w-full p-4 flex justify-center items-center">
      <div className="bg-white/80 rounded-2xl shadow-lg w-full sm:w-96 max-w-[90%] p-6 sm:p-7 text-center hover:shadow-xl">
        <div className="mb-3 h-20 w-20 mx-auto rounded-full">
          <img src={logo} alt="logo" className="object-cover h-full w-full" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">Verify OTP</h1>
        <p className="text-gray-600 text-sm mb-4">
          Enter the 6-digit code sent to your email
        </p>

        <div className="flex justify-between gap-2 mb-4">
          {otp.map((digit, index) => (
            <Input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => { inputsRef.current[index] = el; }}
              className="w-10 h-12 text-center text-xl border border-gray-400  focus:ring-2 focus:ring-blue-500"
              style={{ borderRadius: "8px" }}
            />
          ))}
        </div>

        <Button
          disabled={loading}
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 mt-2 w-full rounded-2xl hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </Button>
      </div>
    </div>
  );
}

export default VerifyOTP;
