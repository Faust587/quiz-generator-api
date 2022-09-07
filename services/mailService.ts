import * as nodemailer from "nodemailer";

export const sendActivationMail = async (to: string, link: string) => {

  const host = process.env.MAIL_SMTP_HOST;
  const port = process.env.MAIL_SMTP_PORT;
  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_PASSWORD;

  const transporter = nodemailer.createTransport({
    // @ts-ignore
    host,
    port,
    secure: false,
    auth: {
      user,
      pass
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to,
      subject: "Hi, activate your account on Quiz App!",
      text: "",
      html: `
        <div>
            <h1>Activate your email!</h1>
            <a href="${link}">Click Here!</a
        </div>
    `
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
