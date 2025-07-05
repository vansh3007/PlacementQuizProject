import { useState } from "react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const resetPassword = useAuthStore(
    (state) =>
      (
        state as {
          resetPassword: (
            password: string
          ) => Promise<{ success: boolean; message?: string }>;
        }
      ).resetPassword
  );

  const isValidPassword = (pw: string) =>
    /[A-Za-z]/.test(pw) &&
    /\d/.test(pw) &&
    /[^A-Za-z0-9]/.test(pw) &&
    pw.length >= 8;

  const handleSubmit = async () => {
    if (!isValidPassword(password)) {
      toast.error(
        "Password must contain letters, digits, symbols and be at least 8 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    const response = await resetPassword(password);
    setLoading(false);

    if (response?.message == "password reset successfully Now you can Login") {
      toast.success(response.message || "Password reset successful.");
      navigate("/login");
    } else {
      toast.error(response?.message || "Failed to reset password.");
    }
  };

  return (
    <div className="font-sans bg-[url('@/assets/mits.png')] bg-no-repeat bg-fixed bg-center bg-cover h-screen w-full p-4 flex justify-center items-center">
      <div className="bg-white/80 rounded-2xl shadow-lg w-full sm:w-96 max-w-[90%] p-6 sm:p-7 text-center hover:shadow-xl">
        <div className="mb-3 h-20 w-20 mx-auto rounded-full">
          <img src={logo} alt="logo" className="object-cover h-full w-full" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Reset Password
        </h1>
        <p className="text-gray-600 text-sm mb-4">Enter your new password</p>

        {/* Password Field */}
        <div className="text-left space-y-1 mb-3">
          <Label htmlFor="password" className="text-base font-medium">
            New Password
          </Label>
          <Input
            type="password"
            autoComplete="off"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-10 p-3 border border-gray-300 rounded-lg"
            style={{ borderRadius: "10px" }}
          />
        </div>

        {/* Confirm Password */}
        <div className="text-left space-y-1">
          <Label htmlFor="confirmPassword" className="text-base font-medium">
            Confirm Password
          </Label>
          <Input
            type="password"
            autoComplete="off"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full h-10 p-3 border border-gray-300 rounded-lg"
            style={{ borderRadius: "10px" }}
          />
        </div>

        {/* Submit */}
        <Button
          disabled={loading}
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 mt-4 w-full rounded-2xl hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </div>
    </div>
  );
}

export default ResetPassword;
