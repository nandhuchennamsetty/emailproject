const Template = require('../models/Template.model');

exports.createTemplate = async (req, res) => {
    console.log('create template',req.body);
  const template = await Template.create(req.body);
  res.status(201).json(template);
};

exports.getTemplates = async (req, res) => {
  const templates = await Template.find();
  res.status(200).json(templates);
};

exports.getTemplateById = async (req, res) => {
  const template = await Template.findById(req.params.id);
  res.json(template);
};

exports.updateTemplate = async (req, res) => {
  const updated = await Template.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};
exports.deleteTemplate = async (req, res) => {
  await Template.findByIdAndDelete(req.params.id);
  res.json({ message: 'Template deleted successfully' });
};