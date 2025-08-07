'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function StudentRegister() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const router = useRouter()

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    const res = await fetch('/api/student/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) router.push('/student/login')
  }

  return (
    <div className="auth-container">
      <div className="center-box">
        <h2>Student Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
          /><br />
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          /><br />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          /><br />
          <button type="submit">Register</button>
        </form>
        <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>
          By registering, you agree to our{' '}
          <a href="/student/terms">Terms and Conditions</a>
        </p>
      </div>
    </div>
  )
}
