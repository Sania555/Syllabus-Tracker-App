'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [role, setRole] = useState(null);
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>EduMilestone</h1>
        <p style={styles.subtitle}>Your Syllabus Tracker App</p>

        {!role && (
          <div style={styles.roleSelector}>
            <button style={styles.roleButton} onClick={() => setRole('student')}>
              Student
            </button>
            <button style={styles.roleButton} onClick={() => setRole('teacher')}>
              Teacher
            </button>
          </div>
        )}

        {role && (
          <div style={styles.actionSelector}>
            <h2>{role === 'student' ? 'Student' : 'Teacher'} Options</h2>
            <button onClick={() => handleNavigation(`/${role}/login`)} style={styles.actionBtn}>Login</button>
            <button onClick={() => handleNavigation(`/${role}/register`)} style={styles.actionBtn}>Register</button>
            {role === 'student' && (
              <button onClick={() => handleNavigation(`/student/terms`)} style={styles.termsBtn}>
                Terms & Conditions
              </button>
            )}
            <button onClick={() => setRole(null)} style={styles.backBtn}>← Back</button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundImage: 'url("/bg-pattern.png")', // ensure bg-pattern.png is in your /public folder
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  container: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    textAlign: 'center',
    width: '90%',
    maxWidth: '500px',
  },
  title: {
    fontSize: '40px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '18px',
    color: '#555',
    marginBottom: '30px',
  },
  roleSelector: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  roleButton: {
    fontSize: '16px',
    padding: '10px 20px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#0c4a6e',
    color: 'white',
    transition: '0.3s',
  },
  actionSelector: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    alignItems: 'center',
  },
  actionBtn: {
    fontSize: '16px',
    padding: '10px 20px',
    backgroundColor: '#0284c7',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%',
  },
  termsBtn: {
    fontSize: '14px',
    padding: '8px 16px',
    backgroundColor: '#facc15',
    color: '#000',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%',
  },
  backBtn: {
    marginTop: '10px',
    fontSize: '14px',
    color: '#555',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};
