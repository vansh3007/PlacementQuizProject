import prisma from "@/utils/prisma";
import { Prisma, User } from "@/generated/prisma";

const createUser = async (data: Prisma.UserCreateInput): Promise<User> => {
  const user = await prisma.user.create({
    data,
  });
  return user;
};

const findUserByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return null;
  }
  return user;
};

const findUserById = async (id: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    return null;
  }
  return user;
};

const sendOtp = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (!user) return null;

  const otp = Math.floor(100000 + Math.random() * 900000);
  await prisma.otp.create({
    data: {
      email,
      code: otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // expires in 10 minutes
    },
  });
  return otp;
};

const verifyOtp = async (email: string, code: number) => {
  const otp = await prisma.otp.findFirst({
    where: {
      email,
      code,
      expiresAt: {
        gt: new Date(Date.now()),
      },
    },
  });
  if (!otp) return null;
  await prisma.otp.delete({
    where: {
      id: otp.id,
      code: otp.code,
    },
  });
  return true;
};

const resetPassword = async (email: string, password: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (!user) return null;
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: password,
    },
  });
  return true;
};

export const studentService = {
  createUser,
  findUserByEmail,
  findUserById,
  sendOtp,
  verifyOtp,
  resetPassword,
};
