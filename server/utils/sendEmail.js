const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const sendContactEmail = async (contactData) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const tmpDir = path.join(__dirname, '../tmp');
    const filePath = path.join(tmpDir, `contact_${Date.now()}.pdf`);

    // Ensure the tmp directory exists
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }

    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);
    doc.fontSize(16).text(`Contact Information`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Name: ${contactData.name}`);
    doc.text(`Email: ${contactData.email}`);
    doc.text(`Message: ${contactData.message}`);
    doc.end();

    stream.on('finish', async () => {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const mailOptions = {
        from: '"Mohiminul Islam Ahad" <mohimin.bd.ahad@gmail.com>',
        to: 'md@nusaiba.com.bd',
        subject: 'New Contact Submission',
        text: 'Attached is the submitted contact information.',
        attachments: [{ filename: 'contact.pdf', path: filePath }],
      };

      try {
        await transporter.sendMail(mailOptions);
        fs.unlinkSync(filePath); // Delete the file after sending the email
        resolve('Email sent successfully');
      } catch (error) {
        reject(error);
      }
    });

    stream.on('error', (error) => {
      reject(error);
    });
  });
};

module.exports = { sendContactEmail };