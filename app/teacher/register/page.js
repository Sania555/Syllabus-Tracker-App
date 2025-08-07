'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function TeacherRegister() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const router = useRouter()

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    const res = await fetch('/api/teacher/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) router.push('/teacher/login')
    else alert("Registration failed")
  }

  return (
    <div className="center-box">
      <h2 className="form-title">Teacher Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
