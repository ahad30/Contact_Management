const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const sendContactEmail = async (contactData) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const filePath = path.join(__dirname, `../tmp/contact_${Date.now()}.pdf`);
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
        host: "smtp.ethereal.email",
        port: 587,
       secure: false,
       auth: {
        user: 'lydia.yundt63@ethereal.email',
        pass: 'eWmfRZsRNyVTCm3QRv'
    },
      });

      const mailOptions = {
        from: 'mohiminulislamahad@gmail.com',
        to: 'md@nusaiba.com.bd',
        subject: 'New Contact Submission',
        text: 'Attached is the submitted contact information.',
        attachments: [{ filename: 'contact.pdf', path: filePath }],
      };

      try {
        await transporter.sendMail(mailOptions);
        fs.unlinkSync(filePath);
        resolve('Email sent successfully');
      } catch (error) {
        reject(error);
      }
    });
  });
};

module.exports = { sendContactEmail };
