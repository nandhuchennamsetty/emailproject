import { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function ContactList() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    getAllContacts();
  }, []);
  
  const getAllContacts = async () => {
    try {
      const res = await api.get('/contacts/allContacts');
      if (res.data?.success) {
        setContacts(res.data?.data || []);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error?.message);
    }
  };

  return (
    <div className='card'>
      <h3>Contacts</h3>

      {contacts.map((c) => (
        <div key={c._id} className='list-item'>
          <strong>{c.name}</strong>
          <p>
            {c.email} | {c.group}
          </p>
        </div>
      ))}
    </div>
  );
}
