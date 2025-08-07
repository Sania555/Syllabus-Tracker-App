'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TeacherDashboard() {
  const router = useRouter();
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [syllabi, setSyllabi] = useState([]);
  const [editId, setEditId] = useState(null);
  const [teacherName, setTeacherName] = useState('');

  
  const fetchSyllabi = async () => {
  const res = await fetch('/api/syllabus/read');
  const data = await res.json();
  setSyllabi(Array.isArray(data.syllabus) ? data.syllabus : []); 
};

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('teacherName');
    if (!token) {
      router.push('/teacher/login');
    }
    if (name) setTeacherName(name);
    fetchSyllabi();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return alert('Unauthorized. Please login.');

    const api = editId ? '/api/syllabus/update' : '/api/syllabus/create';
    const body = editId ? { id: editId, subject, content } : { subject, content, createdBy: 'teacher' };

    const res = await fetch(api, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setSubject('');
      setContent('');
      setEditId(null);
      fetchSyllabi();
    } else {
      alert('Error saving syllabus');
    }
  };

  const handleEdit = (s) => {
    setSubject(s.subject);
    setContent(s.content);
    setEditId(s._id);
  };

  const handleDelete = async (id) => {
    const res = await fetch('/api/syllabus/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) fetchSyllabi();
    else alert('Failed to delete');
  };

  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('teacherName');
    router.push('/');
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>📘 Teacher Dashboard</h1>
        <button onClick={handleLogout} style={{ padding: '8px 12px', background: 'crimson', color: '#fff', border: 'none', borderRadius: '4px' }}>
          Logout
        </button>
      </header>

      {teacherName && <p>Welcome, <strong>{teacherName}</strong></p>}

      <section style={{ marginTop: '2rem' }}>
        <h2>{editId ? '✏️ Edit Syllabus' : '➕ Add Syllabus'}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
          <input
            value={subject}
            onChange={e => setSubject(e.target.value)}
            placeholder="Enter Subject"
            required
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Enter Syllabus Content"
            required
            rows={4}
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: '10px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px' }}>
            {editId ? 'Update Syllabus' : 'Add Syllabus'}
          </button>
        </form>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h2>📚 Existing Syllabus</h2>
        {syllabi.length === 0 ? (
          <p>No syllabus entries found.</p>
        ) : (
          syllabi.map((s) => (
            <div key={s._id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', marginTop: '1rem' }}>
              <h3>{s.subject}</h3>
              <p>{s.content}</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => handleEdit(s)} style={{ background: '#ffa500', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '4px' }}>Edit</button>
                <button onClick={() => handleDelete(s._id)} style={{ background: 'red', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '4px' }}>Delete</button>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
