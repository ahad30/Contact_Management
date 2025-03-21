const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const sendContactEmail = async (contactData) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', async () => {
      const pdfBuffer = Buffer.concat(buffers);

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: '"Mohiminul Islam Ahad" <mohimin.bd.ahad@gmail.com>',
        to: 'md@nusaiba.com.bd',
        subject: 'New Contact Submission',
        text: 'Attached is the submitted contact information.',
        attachments: [{ filename: 'contact.pdf', content: pdfBuffer }],
      };

      try {
        await transporter.sendMail(mailOptions);
        resolve('Email sent successfully');
      } catch (error) {
        reject(error);
      }
    });

    doc.fontSize(16).text(`Contact Information`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Name: ${contactData.name}`);
    doc.text(`Email: ${contactData.email}`);
    doc.text(`Message: ${contactData.message}`);
    doc.end();
  });
};


module.exports = { sendContactEmail };