const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/templates', require('./routes/template.routes'));
app.use('/api/emails', require('./routes/email.routes'));
app.use('/api/contacts', require('./routes/contact.routes'));

module.exports = app;
