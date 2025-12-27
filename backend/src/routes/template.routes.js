const {
  getTemplates,
  createTemplate,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
} = require('../controllers/template.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = require('express').Router();

// protect all template routes
router.use(authMiddleware);

router.post('/', createTemplate);
router.get('/', getTemplates);
router.get('/:id', getTemplateById);
router.put('/:id', updateTemplate);
router.delete('/:id', deleteTemplate);

module.exports = router;
