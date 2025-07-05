import { asyncWrap } from "@/utils/asyncWrap";
import bcrypt from "bcrypt";
import { adminService } from "./admin.service";
import { uploadToCloudinary } from "@/utils/cloudinaryUpload";
import { readExcelFile } from "@/scripts/readExcelFile";
import { Response, Request } from "express";
import { parseExcelData } from "@/scripts/parsedFile";
import { verifyRefreshToken, generateTokens } from "@/lib/auth";
import { setAuthCookie } from "@/lib/cookies";
import { checkAdmin } from "@/lib/checkAdmin";
const registerAdmin = asyncWrap(async (req: Request, res: Response) => {
  const data = req.body;
  const password = data.password;
  const hashedPassword = await bcrypt.hash(password, 10);
  data.password = hashedPassword;
  const admin = await adminService.createAdmin(data);
  const { accessToken, refreshToken } = generateTokens({
    userId: String(admin.id),
    email: admin.email,
  });

  return setAuthCookie(res, accessToken, "Login Successful", refreshToken);
});

const login = asyncWrap(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const admin = await adminService.findAdminByEmail(email);
  if (!admin) {
    return res.json({ message: "admin not found" }).status(404);
  }
  const isPasswordMatch = await bcrypt.compare(password, admin.password);
  if (!isPasswordMatch) {
    return res.json({ message: "password not match" }).status(401);
  }

  const { accessToken, refreshToken } = generateTokens({
    userId: String(admin.id),
    email: admin.email,
  });

  return setAuthCookie(res, accessToken, "Login Successful", refreshToken);
});

const uploadExcel = asyncWrap(async (req: Request, res: Response) => {
  const adminEmail = req.user?.email;
  if (!adminEmail || !(await checkAdmin(adminEmail))) {
    return res.status(401).json({ message: "Use are not authorized" });
  }

  const file = req.file;
  if (!file) {
    return res.status(401).json({ message: "No file uploaded" });
  }

  if (
    file.mimetype !== "application/vnd.ms-excel" &&
    file.mimetype !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    return res.status(400).json({ message: "Invalid file format" });
  }

  // Upload Excel to Cloudinary as raw file
  const result: any = await uploadToCloudinary(
    file.buffer,
    "excel_uploads",
    file.originalname,
    "raw"
  );

  // Parse Excel from buffer (no need to save to disk)
  const data = await readExcelFile(file.buffer);

  if (!data) {
    return res.json({
      message: "No data found",
      filename: file.originalname,
      cloudinaryUrl: result.secure_url,
    });
  }

  const parsedData = parseExcelData(data);
  const savedData = await adminService.saveQuestionsToDB(parsedData);

  return res.json({
    message: "File uploaded successfully",
    filename: file.originalname,
    cloudinaryUrl: result.secure_url,
    savedData,
  });
});

const getAllUsers = asyncWrap(async (req: Request, res: Response) => {
  const adminEmail = req.user?.email;
  if (!adminEmail || !(await checkAdmin(adminEmail))) {
    return res.status(401).json({ message: "Use are not authorized" });
  }

  const users = await adminService.getAllUsers();

  return res.json({
    message: "Users fetched successfully",
    users,
  });
});

const getAllQuestions = asyncWrap(async (req: Request, res: Response) => {
  const adminEmail = req.user?.email;
  if (!adminEmail || !(await checkAdmin(adminEmail))) {
    return res.status(401).json({ message: "Use are not authorized" });
  }
  const questions = await adminService.getAllQuestions();
  return res.json({ message: "Questions fetched successfully", questions });
});

const updateQuestion = asyncWrap(async (req: Request, res: Response) => {
  const adminEmail = req.user?.email;
  if (!adminEmail || !(await checkAdmin(adminEmail))) {
    return res.status(401).json({ message: "Use are not authorized" });
  }
  const id = req.params.id as string;
  const data = req.body;
  const question = await adminService.updateQuestion(id, data);
  if (!question) {
    return res
      .status(404)
      .json({ success: false, message: "Question not found" });
  }
  return res.json({ message: "Question updated successfully", question });
});

const deleteQuestions = asyncWrap(async (req: Request, res: Response) => {
  const adminEmail = req.user?.email;
  if (!adminEmail || !(await checkAdmin(adminEmail))) {
    return res.status(401).json({ message: "Use are not authorized" });
  }
  const id = req.params.id as string;
  const question = await adminService.deleteQuestion(id);
  if (!question) {
    return res
      .status(404)
      .json({ succes: false, message: "Question not found" });
  }
  return res.json({
    sucess: true,
    message: "Question deleted successfully",
    question,
  });
});

const getAllQuestionsById = asyncWrap(async (req: Request, res: Response) => {
  const adminEmail = req.user?.email;
  if (!adminEmail || !(await checkAdmin(adminEmail))) {
    return res.status(401).json({ message: "Use are not authorized" });
  }
  const id = req.params.id as string;
  const questions = await adminService.getAllQuestionsById(id);
  return res.json({ message: "Questions fetched successfully", questions });
});

const logout = asyncWrap(async (_req: Request, res: Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  return res.json({ success: true, message: "Logout successful" }).status(200);
});

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

const adminController = {
  registerAdmin,
  login,
  uploadExcel,
  getAllUsers,
  logout,
  refreshToken,
  getAllQuestions,
  updateQuestion,
  deleteQuestions,
  getAllQuestionsById,
};

export default adminController;
