"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.re_gWvTec51_5tVnWWvQ9ztEe2LKRayKDYWs);

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const inquiryType = formData.get("inquiry_type") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false, error: "Please fill in all required fields." };
  }

  try {
    const { data, error } = await resend.emails.send({
      // Updated after domain verification
from: "NACE Netherlands <info@nace-netherlands.org>",
      to: ["info@nace-netherlands.org"],
      replyTo: email,
      subject: `[NACE Inquiry] ${inquiryType || "General"} - ${name}`,
      html: `
        <h2>New Inquiry from NACE Netherlands Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (e: any) {
    console.error("Server Action Exception:", e);
    return { success: false, error: e.message || "Failed to send email." };
  }
}