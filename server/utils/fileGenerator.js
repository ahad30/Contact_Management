const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');


const generatePDF = async (contact) => {
  return new Promise((resolve, reject) => {
     const doc = new PDFDocument();
     const tmpDir = path.join(__dirname, '../tmp')
     const filePath = path.join(tmpDir, `contact_${Date.now()}.pdf`);
        if (!fs.existsSync(tmpDir)) {
          fs.mkdirSync(tmpDir, { recursive: true });
        }
    doc.pipe(fs.createWriteStream(filePath));
    doc.fontSize(16).text('Contact Information', { align: 'center' }).moveDown();
    doc.fontSize(12).text(`Name: ${contact.name}`);
    doc.fontSize(12).text(`Email: ${contact.email}`);
    doc.fontSize(12).text(`Phone: ${contact.phone}`);
    doc.fontSize(12).text(`Message: ${contact.message}`);

    doc.end();
    doc.on('finish', () => resolve(filePath));
    doc.on('error', reject);
  });
};

// 📌 Generate Excel
const generateExcel = async (contacts) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Contacts');

  worksheet.columns = [
    { header: 'Name', key: 'name', width: 20 },
    { header: 'Email', key: 'email', width: 30 },
    { header: 'Phone', key: 'phone', width: 20 },
    { header: 'Message', key: 'message', width: 50 },
  ];

  contacts.forEach((contact) => {
    worksheet.addRow(contact);
  });
  
  const tmpDir = path.join(__dirname, '../tmp')
  const filePath = path.join(tmpDir, `contact_${Date.now()}.pdf`);
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }
  await workbook.xlsx.writeFile(filePath);
  return filePath;
};

module.exports = { generatePDF, generateExcel };
