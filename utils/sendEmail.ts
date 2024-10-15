import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const sendEmail = async (
  userEmail: String,
  subject: String,
  message: String
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        password: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_FROM_MAIL,
      to: userEmail,
      subject,
      text: message,
    };
    await transporter.sendEmail(mailOptions);
  } catch (error) {
    return NextResponse.json(
      {
        message: `Something went wrong : ${error}`,
      },
      {
        status: 500,
      }
    );
  }
};

export default sendEmail;
