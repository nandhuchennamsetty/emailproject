const sgMail = require('../config/sendgrid');
const Template = require('../models/Template.model');
const Contact = require('../models/Contact.model');
const replaceVariables = require('../utils/replaceVariables');

exports.sendBulkEmail = async (req, res) => {
  const { templateId, group } = req.body;
  console.log('sendBulkEmail===>', req.body);

  const template = await Template.findById(templateId);
  if (!template) {
    return res.status(404).json({ message: 'Template not found' });
  }
  const contacts = await Contact.find({ group });
  console.log('Contacts to send emails to:', contacts);
  if (!contacts || contacts.length === 0) {
    return res.status(200).json({ message: 'No contacts found for group' });
  }

  for (let contact of contacts) {
    const msg = {
      to: contact.email,
      from: process.env.FROM_EMAIL,
      subject: template.subject,
      text: replaceVariables(template.body, contact),
    };
    try {
      const [response] = await sgMail.send(msg);
      console.log(
        'Email sent to',
        msg.to,
        'SendGrid status:',
        response?.statusCode,
        'headers:',
        response?.headers
      );
    } catch (err) {
      const info = err?.response?.body || err.message || err;
      console.error('SendGrid error for', contact.email, info);
      return res.status(500).json({ message: 'SendGrid error', details: info });
    }
  }
  return res.status(200).json({ message: 'Emails sent successfully' });
};
