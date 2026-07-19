import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  let transporter;

  // Use Ethereal test account if credentials are placeholders
  if (process.env.SMTP_EMAIL === 'your_email@gmail.com' || !process.env.SMTP_EMAIL) {
    console.log('Using Ethereal test email account because SMTP credentials are not configured.');
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  } else {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  // Send email
  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html, // Optional HTML version
  };

  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
  // Log the URL where you can view the email in the browser (only works with Ethereal)
  if (info.messageId && (process.env.SMTP_EMAIL === 'your_email@gmail.com' || !process.env.SMTP_EMAIL)) {
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
};

export default sendEmail;
