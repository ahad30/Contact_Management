const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { sendContactEmail } = require('../utils/sendEmail');
const { generatePDF, generateExcel } = require('../utils/fileGenerator');
const fs = require('fs');
const path = require('path');

// Create a new contact
router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();

    // Send email with a PDF attachment
    await sendContactEmail(contact);

    res.status(201).json({ success: true, message: 'Contact saved and email sent.', contact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Get all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({ success: true, contacts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});


// 📌 Download PDF for all contacts
router.get('/pdf', async (req, res) => {
  try {
    const contacts = await Contact.find();
    const pdfPath = await generatePDF(contacts);

    res.download(pdfPath, 'contacts.pdf', (err) => {
      if (err) {
        console.error('Error sending PDF:', err);
      }
      fs.unlink(pdfPath, (err) => {
        if (err) console.error('Error deleting PDF:', err);
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// 📌 Download PDF for a specific contact
router.get('/pdf/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    const pdfPath = await generatePDF([contact]);

    res.download(pdfPath, `contact_${contact._id}.pdf`, (err) => {
      if (err) console.error('Error sending PDF:', err);
      fs.unlink(pdfPath, (err) => {
        if (err) console.error('Error deleting PDF:', err);
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// 📌 Download Excel for all contacts
router.get('/excel', async (req, res) => {
  try {
    const contacts = await Contact.find();
    const excelPath = await generateExcel(contacts);

    res.download(excelPath, 'contacts.xlsx', (err) => {
      if (err) console.error('Error sending Excel:', err);
      fs.unlink(excelPath, (err) => {
        if (err) console.error('Error deleting Excel:', err);
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// 📌 Download Excel for a specific contact
router.get('/excel/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    const excelPath = await generateExcel([contact]);

    res.download(excelPath, `contact_${contact._id}.xlsx`, (err) => {
      if (err) console.error('Error sending Excel:', err);
      fs.unlink(excelPath, (err) => {
        if (err) console.error('Error deleting Excel:', err);
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});



// Delete a contact
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.status(200).json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
