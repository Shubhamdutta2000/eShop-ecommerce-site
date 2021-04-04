import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "shubhamduttanovember@gmail.com", // generated ethereal user
    pass: "shubhamneha", // generated ethereal password
  },
});

let renderTemplate = (data, relativePath) => {
  let mainHTML;
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relativePath),
    data,
    function (err, template) {
      if (err) {
        console.log("Error in rendering!!");
        return;
      }
      mainHTML = template;
    }
  );
  return mainHTML;
};

export { transporter, renderTemplate };
