import { useState } from 'react';
import { api } from '../services/api';

export default function ContactForm({ refresh }) {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    group: '',
  });

  const submitHandler = async () => {
    try {
      await api.post('/contacts/addContact', contact);
      setContact({ name: '', email: '', group: '' });
      refresh();
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  return (
    <div className='card'>
      <h3>Add Contact</h3>

      <input
        placeholder='Name'
        value={contact.name}
        onChange={(e) => setContact({ ...contact, name: e.target.value })}
      />

      <input
        placeholder='Email'
        value={contact.email}
        onChange={(e) => setContact({ ...contact, email: e.target.value })}
      />

      <input
        placeholder='Group (eg: Customers)'
        value={contact.group}
        onChange={(e) => setContact({ ...contact, group: e.target.value })}
      />

      <button onClick={submitHandler}>Add Contact</button>
    </div>
  );
}
