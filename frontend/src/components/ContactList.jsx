import { useEffect, useState } from 'react';
import {api} from '../services/api';

export default function ContactList() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    api.get('/contacts/allContacts').then((res) => setContacts(res.data));
  }, []);

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
