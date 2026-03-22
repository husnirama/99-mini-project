import type { SendEmailParams } from "../types/email-type.js";
import { resend } from "../lib/resend.js";
import Handlebars from "handlebars";
import fs from "node:fs/promises";
import path from "node:path";

export default async function SendEmail({
  to,
  subject,
  emailData,
  emailTemplate,
}: SendEmailParams) {
  const filePath = path.join(process.cwd(), emailTemplate);
  const templateContent = await fs.readFile(filePath, "utf-8");
  const template = Handlebars.compile(templateContent);
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [to],
      subject: subject,
      html: template({
        name: emailData.name,
        referralCode: emailData.referralCode,
      }),
    });
  } catch (error) {
    throw new Error(`Failed to send email: ${error}`);
  }
}
