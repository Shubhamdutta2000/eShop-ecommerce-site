import { transporter, renderTemplate } from "../config/nodemailer.js";

const forgetPassword_mailer = (resetPassword) => {
  console.log("Inside forget assword mailer", resetPassword);
  transporter.sendMail(
    {
      from: "shubhamdutta1511@gmail.com",
      to: resetPassword.user.email,
      subject: "Forget Password Request!",
      html: `<h1>Your access token for password reset is ${resetPassword.accessToken} <h1>`,
    },
    (err, info) => {
      if (err) {
        console.log("Error in sending mail", err);
        return;
      }
      console.log("Message sent: \n", info);
      return;
    }
  );
};

export default forgetPassword_mailer;
