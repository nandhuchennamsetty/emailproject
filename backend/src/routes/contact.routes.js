const express = require('express');
const router = express.Router();

const {
  addContact,
  getAllContacts,
  getContactByGroup,
  updateContact,
  deleteContact,
  getUniqueGroups,
} = require('../controllers/contact.controller');

router.post('/addContact', addContact);
router.get('/allContacts', getAllContacts);
router.get('/group/:group', getContactByGroup);
router.get('/groups', getUniqueGroups);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

module.exports = router;
