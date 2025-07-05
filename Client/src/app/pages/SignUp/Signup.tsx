import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "@/schemas/signupSchema";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import logo from "@/assets/logo.png";
import { Eye, EyeOff } from "lucide-react";
import type { SubmitHandler } from "react-hook-form";

interface ProfileForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  enrollment: string;
  profile?: string;
  branch: string;
  admissionYear: number;
  currentYear: number;
}

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
  signup: (data: ProfileForm) => Promise<boolean>;
  googleUser: GoogleUser;
  isSigningup: boolean;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const signup = useAuthStore((state) => (state as UseAuthStore).signup);
  const googleUser = useAuthStore(
    (state) => (state as UseAuthStore).googleUser
  );
  const isSigningup = useAuthStore(
    (state) => (state as UseAuthStore).isSigningup
  );

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);




  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: googleUser?.given_name+" "+ googleUser?.family_name,
      email: googleUser?.email,
      profile: googleUser?.picture,
      enrollment: googleUser?.given_name,
      branch:"ET",
      admissionYear:2022,
      currentYear:4,
    },
    });
  
  
  
  const onSubmit: SubmitHandler<ProfileForm> = async (data) => {
      console.log(data);
      try {
        setLoading(true);
        const success = await signup(data);
        console.log(success);
      setLoading(false);
      if (success) {
        navigate("/");
      }
    } catch {
      setLoading(false);
      toast.error("Signup failed. Try again.");
    }
  };

  useEffect(() => {
    if (!isSigningup) {
      navigate("/login");
    }
  }, [isSigningup, navigate]);

  if (!isSigningup) return null;

  return (
    <div className="font-sans bg-[url('@/assets/mits.png')] bg-no-repeat bg-fixed bg-center bg-cover flex justify-center items-center h-screen w-full p-4">
      <div className="bg-white/80 rounded-2xl shadow-lg w-full sm:w-96 max-w-[90%] p-6 sm:p-8 text-center hover:shadow-xl">
        <div className="mb-4 h-24 w-30 mx-auto overflow-hidden">
          <img src={logo} alt="logo" className="object-cover h-full w-full" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Complete Signup
        </h1>
        <p className="text-gray-600 text-sm mb-6">
          Just set your password and get started!
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full"
        >
          {/* Password */}
          <div className="text-left space-y-1 relative">
            <Label htmlFor="password" className="text-base font-medium">
              Create Password
            </Label>
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password")}
              placeholder="Create a strong password"
              className="w-full h-10 p-3 border border-gray-300 rounded-lg pr-10"
              aria-invalid={!!errors.password}
            />
            <button
              type="button"
              className="absolute top-[38px] right-3 text-gray-600"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="text-left space-y-1 relative">
            <Label htmlFor="confirmPassword" className="text-base font-medium">
              Confirm Password
            </Label>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              {...register("confirmPassword")}
              placeholder="Re-enter your password"
              className="w-full h-10 p-3 border border-gray-300 rounded-lg pr-10"
              aria-invalid={!!errors.confirmPassword}
            />
            <button
              type="button"
              className="absolute top-[38px] right-3 text-gray-600"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white py-3 rounded-2xl hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
