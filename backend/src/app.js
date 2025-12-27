const express = require('express');
const cors = require('cors');

const app = express();
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);
app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/templates', require('./routes/template.routes'));
app.use('/api/emails', require('./routes/email.routes'));
app.use('/api/contacts', require('./routes/contact.routes'));

module.exports = app;
