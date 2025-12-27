const mongoose = require('mongoose');
const Template = require('../models/Template.model');

exports.createTemplate = async (req, res) => {
  const template = await Template.create(req.body);
  res.status(201).json(template);
};

exports.getTemplates = async (req, res) => {
  try {
    const templates = await Template.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: templates });
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({
      success: false,
      message: 'Failed fetching templates',
    });
  }
};

exports.getTemplateById = async (req, res) => {
  try {
    const {id} = req.params;
    const template = await Template.findById(id);
    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found',
      });
    }
    res.status(200).json({success:true, data: template});
  } catch (error) {
    console.error('Error fetching template by ID:', error?.message);
    res.status(500).json({
      success: false,
      message: 'Failed fetching template by ID',
    });
  }

};


exports.updateTemplate = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid template ID',
      });
    }

    const updatedTemplate = await Template.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTemplate) {
      return res.status(404).json({
        success: false,
        message: 'Template not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Template updated successfully',
      data: updatedTemplate,
    });
  } catch (error) {
    console.error('Update Template Error:', error.message);

    res.status(500).json({
      success: false,
      message: 'Server error while updating template',
    });
  }
};

exports.deleteTemplate = async (req, res) => {
  await Template.findByIdAndDelete(req.params.id);
  res.json({ message: 'Template deleted successfully' });
};
