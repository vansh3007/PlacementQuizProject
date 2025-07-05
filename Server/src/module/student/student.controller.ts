import { studentService } from "./student.service";
import { Request, Response } from "express";
import { oauth2Client } from "@/config/google.config";
import bcrypt from "bcrypt";
import axios from "axios";
import {
  generateTokens,
  verifyRefreshToken,
  generateOtpToken,
} from "@/lib/auth";
import { setAuthCookie, setOtpCookie, clearOtpCookie } from "@/lib/cookies";
import { asyncWrap } from "@/utils/asyncWrap";
import { sendWelcomeEmail } from "@/lib/emailService";
import { sendResetPasswordEmail } from "@/lib/emailService";
const signUpUser = async (req: Request, res: Response) => {
  const data = req.body;
  const { password } = data;
  const hashedPassword = await bcrypt.hash(password, 10);
  data.password = hashedPassword;
  const user = await studentService.createUser(data);
  if (!user) return res.json({ message: "user not created" }).status(401);
  const { accessToken, refreshToken } = generateTokens({
    userId: String(user.id),
    email: user.email,
  });

  await sendWelcomeEmail(user.email, user.name);

  const { password: _password, ...restUser } = user;

  return setAuthCookie(
    res,
    accessToken,
    "User Created and logged in successfully",
    refreshToken,
    restUser
  );
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await studentService.findUserByEmail(email);

  if (!user) {
    return res.json({ message: "user not found" }).status(401);
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.json({ message: "password not match" }).status(401);
  }

  const { accessToken, refreshToken } = generateTokens({
    userId: String(user.id),
    email: user.email,
  });
  const { password: _password, ...RestUser } = user;
  return setAuthCookie(
    res,
    accessToken,
    "Login Successful",
    refreshToken,
    RestUser
  );
};

const logout = async (_req: Request, res: Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  return res.json({ sucess: true, message: "Logout successful" }).status(200);
};

const googleLogin = async (req: Request, res: Response) => {
  const code = req.query.code as string;
  if (!code) {
    return res.json({ message: "code not found" }).status(401);
  }
  const googleRes = await oauth2Client.getToken(code);

  oauth2Client.setCredentials(googleRes.tokens);

  const userRes = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
  );

  if (!userRes || !userRes.data) {
    return res.json({ success: false, message: "user not found" }).status(401);
  }

  const data = userRes.data;

  const user = await studentService.findUserByEmail(data.email);

  if (!user) {
    return res
      .json({
        success: false,
        message: "user not found please sign up",
        user: data,
      })
      .status(401);
  }

  const { accessToken, refreshToken } = generateTokens({
    userId: String(user.id),
    email: user.email,
  });
  const { password, ...RestUser } = user;
  return setAuthCookie(
    res,
    accessToken,
    "Login Successful",
    refreshToken,
    RestUser
  );
};

const refreshToken = asyncWrap(async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  const decoded = verifyRefreshToken(refreshToken);
  if (!decoded) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }

  const { userId, email } = decoded;
  const tokens = generateTokens({ userId, email });

  return setAuthCookie(
    res,
    tokens.accessToken,
    "Token refreshed",
    tokens.refreshToken
  );
});

const sendOtp = asyncWrap(async (req: Request, res: Response) => {
  const { email } = req.body;
  const otp = await studentService.sendOtp(email);
  if (!otp) {
    return res.json({ success: false, message: "user not found" }).status(401);
  }

  const emailResponse = await sendResetPasswordEmail(email, otp);
  if (!emailResponse)
    return res.json({ success: false, message: "otp not sent" }).status(401);

  return res
    .json({ success: true, message: "otp sent successfully" })
    .status(200);
});

const verifyOtp = asyncWrap(async (req: Request, res: Response) => {
  const { email, code } = req.body;

  const isVerified = await studentService.verifyOtp(email, code);

  if (!isVerified) {
    return res
      .status(401)
      .json({ success: false, message: "OTP not verified" });
  }
  const otpToken = generateOtpToken({ email });
  setOtpCookie(res, otpToken);

  return res
    .status(200)
    .json({ success: true, message: "OTP verified successfully" });
});

const resetPassword = asyncWrap(async (req: Request, res: Response) => {
  const email = req.otpUser?.email;
  if (!email)
    return res
      .json({ success: false, message: "You are not authorized" })
      .status(401);
  const data = req.body;
  const { password } = data;
  const hashedPassword = await bcrypt.hash(password, 10);
  data.password = hashedPassword;
  const isPasswordReset = await studentService.resetPassword(
    email,
    data.password
  );

  if (!isPasswordReset) {
    clearOtpCookie(res);
    return res
      .json({ success: false, message: "password not reset" })
      .status(401);
  }
  clearOtpCookie(res);
  return res
    .json({
      successs: true,
      message: "password reset successfully Now you can Login",
    })
    .status(200);
});

export const userController = {
  signUpUser,
  login,
  googleLogin,
  logout,
  refreshToken,
  sendOtp,
  verifyOtp,
  resetPassword,
};
