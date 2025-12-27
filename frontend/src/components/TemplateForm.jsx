import { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function TemplateForm({ refresh, editTemplate }) {
  const [template, setTemplate] = useState({
    name: '',
    subject: '',
    body: '',
  });

  useEffect(() => {
    if (editTemplate?._id) {
      setTemplate(editTemplate);
    } else {
      setTemplate({ name: '', subject: '', body: '' });
    }
  }, [editTemplate]);

  const submitHandler = async () => {
    try {
      if (editTemplate?._id) {
        const res = await api.put(`/templates/${editTemplate._id}`, template);
        if (res.data?.success) {
          console.log('Template updated successfully');
          alert('Template updated successfully');
        }
      } else {
        const res = await api.post('/templates', template);
        if (res.data?.success) {
          console.log('Template created successfully');
          alert('Template created successfully');
        }
      }
      setTemplate({ name: '', subject: '', body: '' });
      refresh();
    } catch (error) {
      console.error('Error saving template:', error);
    }
  };

  return (
    <div className='card'>
      <h3>Create Email Template</h3>

      <input
        placeholder='Template Name'
        value={template.name}
        onChange={(e) => setTemplate({ ...template, name: e.target.value })}
      />

      <input
        placeholder='Email Subject'
        value={template.subject}
        onChange={(e) => setTemplate({ ...template, subject: e.target.value })}
      />

      <textarea
        placeholder='Hello {{name}}, Welcome!'
        value={template.body}
        onChange={(e) => setTemplate({ ...template, body: e.target.value })}
      />

      <button onClick={submitHandler}>Save Template</button>
    </div>
  );
}
