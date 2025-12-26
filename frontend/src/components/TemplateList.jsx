import { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function TemplateList({ onSelect, onEdit }) {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  useEffect(() => {
    api.get('/templates').then((res) => setTemplates(res.data));
  }, [isDelete]);

  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/templates/${id}`);
      console.log('Delete response:', res);
      setIsDelete(!isDelete);
    } catch (error) {
      console.error('Error deleting template:', error);
    }
  };

  const handleEdit = (template) => {
    onEdit(template);
  };

  return (
    <div className='card'>
      <h3>Templates</h3>
      {templates.map((t) => (
        <div
          key={t._id}
          onClick={() => {
            onSelect(t);
            setSelectedTemplate(t._id);
          }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            backgroundColor: selectedTemplate === t._id ? '#e0e0e0' : 'transparent',
          }}
        >
          <div className='list-item'>
            <strong>{t.name}</strong>
            <p>{t.subject}</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(t._id);
              }}
            >
              Delete
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(t);
              }}
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
