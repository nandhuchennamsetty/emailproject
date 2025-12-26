const {getTemplates, createTemplate, getTemplateById,updateTemplate,deleteTemplate} = require('../controllers/template.controller');
const router = require('express').Router();
router.post('/', createTemplate);
router.get('/', getTemplates);
router.get('/:id', getTemplateById);
router.put('/:id', updateTemplate);
router.delete('/:id', deleteTemplate);
module.exports = router;