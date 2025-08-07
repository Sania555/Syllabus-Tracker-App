'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentDashboard() {
  const [syllabi, setSyllabi] = useState([]);
  const router = useRouter();

  const fetchSyllabi = async () => {
    const res = await fetch('/api/syllabus/read');
    const data = await res.json();
    setSyllabi(data);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/student/login');
    } else {
      fetchSyllabi();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/student/login');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Student Dashboard - View Syllabus</h2>
        <button onClick={handleLogout} style={{ padding: '8px 12px', backgroundColor: '#d9534f', color: 'white', border: 'none', borderRadius: '4px' }}>
          Logout
        </button>
      </div>

      {syllabi.length === 0 ? (
        <p>No syllabus found.</p>
      ) : (
        syllabi.map((s) => (
          <div key={s._id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
            <strong>{s.subject}</strong>
            <p>{s.content}</p>
          </div>
        ))
      )}
    </div>
  );
}
