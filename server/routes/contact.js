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


router.get('/pdf', async (req, res) => {
  try {
    const contacts = await Contact.find(); // Fetch all contacts
    const pdfPath = await generatePDF(contacts); // Generate PDF for all contacts

    // Send the file as a downloadable response
    res.download(pdfPath, 'contacts.pdf', (err) => {
      if (err) console.error('Error sending PDF:', err);
      // Delete the file after sending
      fs.unlink(pdfPath, (err) => {
        if (err) console.error('Error deleting PDF:', err);
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

router.get('/excel', async (req, res) => {
  try {
    const contacts = await Contact.find();
    const excelPath = await generateExcel(contacts);

    // Send the file as a downloadable response
    res.download(excelPath, 'contacts.xlsx', (err) => {
      if (err) console.error('Error sending Excel:', err);
      // Delete the file after sending
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
