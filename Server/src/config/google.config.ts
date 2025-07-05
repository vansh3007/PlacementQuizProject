import { google } from "googleapis/build/src";
import { env } from "./env.config";

const clinetId = env.authClientId as string;
const clientSecret = env.authClientSecret as string

export const oauth2Client = new google.auth.OAuth2(
  clinetId,
  clientSecret,
  "postmessage"
);
