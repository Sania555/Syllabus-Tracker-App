'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TeacherLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/teacher/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      router.push('/teacher/dashboard');
    } else {
      alert('Login failed');
    }
  };

  return (
    <div className="center-box">
      <h2 className="form-title">Teacher Login</h2>
      <form onSubmit={handleLogin}>
        <input
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          className="form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button className="form-button" type="submit">Login</button>
      </form>
    </div>
  );
}
