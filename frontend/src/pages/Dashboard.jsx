import { useState } from 'react';
import TemplateForm from '../components/TemplateForm';
import TemplateList from '../components/TemplateList';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';
import SendEmails from '../components/SendEmails';

export default function Dashboard() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [editTemplate, setEditTemplate] = useState(null);

  return (
    <div className='dashboard'>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          className='logout-button'
          onClick={() => {
            localStorage.removeItem('token');
            window.location.reload();
          }}
        >
          Logout
        </button>
      </div>

      {/* STEP 1 */}
      <section className='section'>
        <h2>① Create or Select Template</h2>
        <div className='grid'>
          <TemplateForm editTemplate={editTemplate} refresh={() => window.location.reload()} />
          <TemplateList onSelect={setSelectedTemplate} onEdit={setEditTemplate} />
        </div>
      </section>

      {/* STEP 2 */}
      <section className='section'>
        <h2>② Add & Manage Contacts</h2>
        <div className='grid'>
          <ContactForm refresh={() => window.location.reload()} />
          <ContactList />
        </div>
      </section>

      {/* STEP 3 */}
      <section className='section highlight'>
        <h2>③ Send Bulk Emails</h2>
        <SendEmails selectedTemplate={selectedTemplate} />
      </section>
    </div>
  );
}
