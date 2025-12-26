const Contact = require('../models/Contact.model');

exports.addContact = async (req, res) => {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
}

exports.getContactByGroup = async (req, res) => {
    const contacts = await Contact.find({ group: req.parms.group });
    res.status(200).json(contacts);
}

exports.getAllContacts = async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
};

exports.updateContact = async (req, res) => {
  const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteContact = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: 'Contact deleted successfully' });
};

exports.getUniqueGroups = async (req, res) => { 
  const groups = await Contact.distinct('group');
  res.status(200).json(groups);
}