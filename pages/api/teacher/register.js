import connect from '../connect';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  await connect();

  const { name, email, password } = req.body;

  const existing = await User.findOne({ email, role: 'teacher' });
  if (existing) return res.status(400).json({ message: 'Teacher already exists' });

  const hashed = await bcrypt.hash(password, 10);

  const user = new User({ name, email, password: hashed, role: 'teacher' });
  await user.save();

  res.status(201).json({ message: 'Teacher registered successfully' });
}
