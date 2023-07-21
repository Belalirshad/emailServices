const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer"); // Add multer for handling file uploads
const nodemailer = require("nodemailer");


app.use(cors());
// Use body-parser middleware to parse the incoming form data

app.use(express.json());

// Replace these variables with your actual email account settings
const yourEmail = "thakurhospital0657@gmail.com";
const yourPassword = "yqhixurjojncmyqb";

const transporter = nodemailer.createTransport({
  service: "Gmail", // e.g., 'gmail'
  auth: {
    user: yourEmail,
    pass: yourPassword,
  },
});

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/sendEmail", upload.single("attachment"), (req, res) => {
  const { to, posttype, name, text, mobile } = req.body;
  let mailOptions;
  if(posttype === undefined) {
     mailOptions = {
      from: yourEmail,
      to,
      subject: "Contact Us Form",
      // html : `<div> Name : ${name} </div><div> Email : ${to} </div><div> Post Type : ${posttype} </div><br /><p style="color:#f9f9f9">Please find the attachment below</>`,
      html: `<div style="font-family: Arial, sans-serif;  max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;">
      <h1 style="color: #333;
      text-align: center;">Contact Us</h1>
      <div style=" margin-top: 20px;
      padding: 10px;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 5px;">
          <div style="margin-bottom: 10px;"><strong>Name:</strong> ${name}</div>
          <div style="margin-bottom: 10px;"><strong>Email:</strong> ${to}</div>
          <div style="margin-bottom: 10px;"><strong>Mobile:</strong> ${mobile}</div>
      </div>
      <div style=" margin-top: 20px;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 10px;">
          <p style="color: #333;>Please find the attachment below.</p>
      </div>
      <div style="margin-top: 20px;
      padding: 10px;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 5px;>
          <p><strong>Message:</strong></p><p>${text}<?p>
      </div>
  </div>`,
    };
  }else if(mobile === undefined) {

    mailOptions = {
     from: yourEmail,
     to,
     subject: "Career Form Submission",
     // html : `<div> Name : ${name} </div><div> Email : ${to} </div><div> Post Type : ${posttype} </div><br /><p style="color:#f9f9f9">Please find the attachment below</>`,
     html: `<div style="font-family: Arial, sans-serif;  max-width: 600px;
     margin: 0 auto;
     padding: 20px;
     background-color: #f9f9f9;">
     <h1 style="color: #333;
     text-align: center;">New Form Submission</h1>
     <div style=" margin-top: 20px;
     padding: 10px;
     background-color: #fff;
     border: 1px solid #ccc;
     border-radius: 5px;">
         <div style="margin-bottom: 10px;"><strong>Name:</strong> ${name}</div>
         <div style="margin-bottom: 10px;"><strong>Email:</strong> ${to}</div>
         <div style="margin-bottom: 10px;"><strong>Post Type:</strong> ${posttype}</div>
     </div>
     <div style=" margin-top: 20px;
     background-color: #fff;
     border: 1px solid #ccc;
     border-radius: 5px;
     padding: 10px;">
         <p style="color: #333;>Please find the attachment below.</p>
     </div>
     <div style="margin-top: 20px;
     padding: 10px;
     background-color: #fff;
     border: 1px solid #ccc;
     border-radius: 5px;>
         <p><strong>Attachment:</strong></p>
     </div>
  </div>`,
   };
  
   if (req.file) {
     // Add the attachment if a file was uploaded
     mailOptions.attachments = [
       {
         filename: req.file.originalname,
         content: req.file.buffer,
       },
     ];
   }
  }


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // console.error("Error sending email:", error);
      res.status(500).json({ error: "Error sending email" });
    } else {
      // console.log("Email sent:", cons);
      res.json({ message: "Email sent successfully" });
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
