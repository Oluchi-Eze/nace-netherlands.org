import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    // Configure the Gmail SMTP transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    // Set up the email options
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'chaplain@anglican.nl',
      subject: `New NACE Website Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    }

    // Send the email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true, message: 'Email sent successfully!' })
  } catch (error) {
    console.error('Failed to send email:', error)
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 })
  }
}