const nodemailer = require("nodemailer");

exports.handler = async (event, context) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "YourEmailService", // e.g., 'Gmail'
      auth: {
        user: "YourEmailAddress",
        pass: "YourEmailPassword",
      },
    });

    const mailOptions = {
      from: "your@email.com",
      to: "recipient@email.com",
      subject: "Subject of the email",
      text: "This is the email body.",
    };

    const info = await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully", info }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Error sending email",
        details: error.message,
      }),
    };
  }
};
