import { transporter } from "@/config/nodemailer.config";
import { env } from "@/config/env.config";
export const sendWelcomeEmail = async (email: string, name: string) => {
  const emailInfo = await transporter.sendMail({
    from: `${env.from}<${env.mailerEmail}>`,
    to: email,
    subject: "Welcome to our app",
    html: `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
    <h2 style="color: #004080;">Welcome to the Placement Preparation Portal, ${name}!</h2>
    <p>Dear ${name},</p>

    <p>
      We are delighted to inform you that your registration on the 
      <strong>Placement Preparation Portal</strong> has been successfully completed.
    </p>

    <p>
      This portal is designed to support your placement journey by offering:
      <ul>
        <li>Topic-wise MCQ practice (Aptitude, DSA, Verbal, and more)</li>
        <li>Difficulty-level tracking and performance analytics</li>
        <li>Curated resources for interviews and resume building</li>
      </ul>
    </p>

    <p>
      We encourage you to explore the portal regularly and take advantage of the tools
      and resources available. Your active participation will play a crucial role in your
      preparation and success during the placement season.
    </p>

    <p>
      For any assistance or queries, feel free to reach out to the <strong>T&P Cell</strong>.
    </p>

    <p>Wishing you the very best for your placement journey.</p>

    <p style="margin-top: 30px;">
      Regards,<br/>
      <strong>Training & Placement Cell</strong><br/>
      MITS, Gwalior
    </p>
  </div>
`,
  });
  return emailInfo.response;
};

export const sendResetPasswordEmail = async (email: string, code: number) => {
  const emailInfo = await transporter.sendMail({
    from: `${env.from}<${env.mailerEmail}>`,
    to: email,
    subject: "Welcome Reset you Password",
    html: `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
    <h2 style="color: #cc0000;">Password Reset Request</h2>

    <p>Dear User,</p>

    <p>
      We received a request to reset your password for the 
      <strong>Placement Preparation Portal</strong>.
    </p>

    <p>
      Please use the following code to reset your password:
    </p>

    <div style="font-size: 24px; font-weight: bold; background-color: #f2f2f2; padding: 10px 20px; border-radius: 8px; display: inline-block; margin: 20px 0;">
      ${code}
    </div>

    <p>
      If you didn’t request this change, you can safely ignore this email. 
      This code is valid only for a limited time.
    </p>

    <p style="margin-top: 30px;">
      Regards,<br/>
      <strong>Training & Placement Cell</strong><br/>
      [Your College Name]
    </p>
  </div>
`,
  });
  return emailInfo.response;
};
