import { transporter, renderTemplate } from "../config/nodemailer.js";

export default forgetPassword_mail = (resetPassword) => {
  console.log("Inside forget assword mailer");
  transporter.sendMail(
    {
      from: "shubhamdutta1511@gmil.com",
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
