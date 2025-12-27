const Contact = require('../models/Contact.model');

exports.addContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    if (!contact) {
      return res.status(400).json({ message: 'Failed to create contact' });
    }
    res.status(201).json({
      success: true,
      data: contact,
      message: 'Contact added successfully',
    });
  } catch (error) {
    console.error('Error adding contact:', error);
    res.status(500).json({ message: 'Failed to add contact' });
  }
};



exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: contacts });
  }catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed fetching contacts',
    });
  }
};

exports.getUniqueGroups = async (req, res) => {
  const groups = await Contact.distinct('group');
  res.status(200).json(groups);
};

exports.updateContact = async (req, res) => {
  const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteContact = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: 'Contact deleted successfully' });
};

exports.getContactByGroup = async (req, res) => {
  const contacts = await Contact.find({ group: req.parms.group });
  res.status(200).json(contacts);
};