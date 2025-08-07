import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#333',
      color: '#fff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px'
    }}>
      <div>
        <Link href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '20px' }}>
          EduMilestone
        </Link>
      </div>
      <div style={{ display: 'flex', gap: '15px' }}>
        <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link href="/student/login" style={{ color: 'white', textDecoration: 'none' }}>Student</Link>
        <Link href="/teacher/login" style={{ color: 'white', textDecoration: 'none' }}>Teacher</Link>
      </div>
    </nav>
  );
}
