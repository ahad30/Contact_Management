const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');


const generatePDF = async (contacts) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const tmpDir = path.join(__dirname, '../tmp');
    const filePath = path.join(tmpDir, `contacts_${Date.now()}.pdf`);

    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Add a title
    doc.fontSize(16).text('Contact List', { align: 'center' }).moveDown();

    // Loop through all contacts and add them to the PDF
    contacts.forEach((contact, index) => {
      doc.fontSize(12).text(`Contact ${index + 1}:`, { underline: true }).moveDown();
      doc.fontSize(12).text(`Name: ${contact.name}`);
      doc.fontSize(12).text(`Email: ${contact.email}`);
      doc.fontSize(12).text(`Message: ${contact.message}`);
      doc.moveDown(); // Add space between contacts
    });

    doc.end();

    stream.on('finish', () => resolve(filePath));
    stream.on('error', reject);
  });
};

// 📌 Generate Excel
const generateExcel = async (contacts) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Contacts');

  worksheet.columns = [
    { header: 'Name', key: 'name', width: 20 },
    { header: 'Email', key: 'email', width: 30 },
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
