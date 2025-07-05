import nodemailer from "nodemailer";
import { env } from "./env.config";



export const transporter = nodemailer.createTransport({
  service: env.mailerService,
  auth: {
    user: env.mailerEmail,
    pass: env.mailerPassword,
  },
});
