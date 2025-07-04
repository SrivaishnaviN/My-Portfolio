const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Configure your email transport (use your Gmail credentials or an app password)
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'srivaishnavin2004@gmail.com',
      pass: 'YOUR_APP_PASSWORD' // Use an App Password, not your Gmail password
    }
  });

  let mailOptions = {
    from: email,
    to: 'srivaishnavin2004@gmail.com',
    subject: `Portfolio Contact Form: Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
