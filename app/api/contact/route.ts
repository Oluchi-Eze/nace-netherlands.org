import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const { name, email, inquiry_type, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      )
    }

    // Configure your email provider details
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    // Send the email to info@nace-netherlands.org
    await transporter.sendMail({
      from: `"NACE Website" <${process.env.SMTP_USER}>`,
      to: 'info@nace-netherlands.org',
      replyTo: email,
      subject: `[NACE Inquiry] ${inquiry_type || 'General'} - ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nReason: ${inquiry_type}\n\nMessage:\n${message}`,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: any) {
    console.error('Failed to send email:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Check server logs.' },
      { status: 500 }
    )
  }
}