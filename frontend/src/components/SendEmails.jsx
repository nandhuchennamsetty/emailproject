import { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function SendEmail({ selectedTemplate }) {
  const [group, setGroup] = useState('');
  const [groupsData, setGroupsData] = useState([]);

  useEffect(() => {
    getAllUniqueGroups();
  }, []);

  const getAllUniqueGroups = async () => {
    try {
      const res = await api.get('/contacts/groups');
      setGroupsData(res.data || []);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const sendEmails = async () => {
    try {
      if (!selectedTemplate) return alert('Select a template first');
      const response = await api.post('/emails/send', {
        templateId: selectedTemplate._id,
        group,
      });
      if (response.data?.status === 201 || response.status === 200) {
        alert('Emails sent successfully,Please check your Spam folder ...');
      }
    } catch (error) {
      console.error('Error sending emails:', error);
    }
  };

  return (
    <div className='card'>
      <h3>Send Bulk Email</h3>
      <p>
        Selected Template: <strong>{selectedTemplate?.name || 'None'}</strong>
      </p>

      <select
        onChange={(e) => setGroup(e.target.value)}
        style={{
          marginBottom: 10,
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          boxSizing: 'border-box',
        }}
      >
        <option value=''>Select Group</option>
        {groupsData.map((g, i) => (
          <option key={i} value={g}>
            {g}
          </option>
        ))}
      </select>
      <button onClick={sendEmails} disabled={!selectedTemplate || !group}>
        Send Emails
      </button>
      <p className='helper'>Select a template and a contact group to send bulk emails.</p>
    </div>
  );
}
