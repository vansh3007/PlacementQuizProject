import { configDotenv } from "dotenv";
configDotenv();

export const env = {
  port: process.env.PORT,
  authClientId: process.env.OAUTH_CLIENT_ID,
  authClientSecret: process.env.OAUTH_CLIENT_SECRET,
  jwtSecret: process.env.JWT_SECRET,
  jwtTimeOut: process.env.JWT_TIMEOUT,
  refreshTimeOut: process.env.REFRESH_TIMEOUT,
  refreshTokenSecret: process.env.REFRESh_SECRET,
  timeOut: process.env.JSON_TOKEN_TIMEOUT,
  nodeEnv: process.env.NODE_ENV,
  mailerEmail: process.env.MAILER_EMAIL,
  mailerPassword: process.env.MAILER_PASSWORD,
  mailerService: process.env.MAILER_SERVICE,
  from: process.env.FROM,
  otpSecret: process.env.OTP_SECRET,
  otpTimeOut: process.env.OTP_TIMEOUT,
  cloudinary: {
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  },
};
