import prisma from "@/utils/prisma";

export const checkAdmin = async (email: string): Promise<boolean> => {
  const admin = await prisma.admin.findUnique({ where: { email } });
  return !!admin;
};

