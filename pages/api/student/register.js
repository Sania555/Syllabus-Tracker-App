import connect from '../connect';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  await connect();

  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  const user = new User({ name, email, password: hashed, role: 'student' });
  await user.save();

  res.status(201).json({ message: 'Student registered successfully' });
}
