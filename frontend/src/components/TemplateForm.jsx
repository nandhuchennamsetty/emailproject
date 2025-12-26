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
        await api.put(`/templates/${editTemplate._id}`, template);
      } else {
        await api.post('/templates', template);
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
