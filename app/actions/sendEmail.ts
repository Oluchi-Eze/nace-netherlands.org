'use server';

import { Resend } from 'resend';

export async function sendEmail(formData: FormData) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error('RESEND_API_KEY missing from environment variables.');
    return { success: false, error: 'Server configuration error: Missing API Key.' };
  }

  const resend = new Resend(apiKey);

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const inquiryType = (formData.get('inquiry_type') as string) || 'General Inquiry';
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return { success: false, error: 'Please fill in all required fields.' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'NACE Netherlands <onboarding@resend.dev>',
      // Temporary testing recipient (must match your Resend signup email while using onboarding@resend.dev)
      to: 'nacenetherlands@gmail.com', 
      replyTo: email,
      subject: `[${inquiryType}] New Contact Form Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nReason: ${inquiryType}\n\nMessage:\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Reason for Inquiry:</strong> ${inquiryType}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error('Server action error:', err);
    return { success: false, error: 'An unexpected error occurred. Please try again later.' };
  }
}