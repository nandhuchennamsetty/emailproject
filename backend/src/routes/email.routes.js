const router = require('express').Router();
const { sendBulkEmail } = require('../controllers/email.controller');

router.post('/send', sendBulkEmail);
module.exports = router;