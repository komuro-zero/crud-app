import { NextResponse } from 'next/server';
import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const sendEmail = async (
  userEmail: string,
  subject: string,
  message: string
) => {
  try {
    const transporter: Transporter<SMTPTransport.Options> =
      nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });

    const mailOptions = {
      from: process.env.SMTP_FROM_MAIL,
      to: userEmail,
      subject,
      text: message,
    };
    const result = await transporter.sendMail(mailOptions);
    console.log(result);
  } catch (error) {
    console.log(error);
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
