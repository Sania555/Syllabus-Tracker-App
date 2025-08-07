import connect from '../connect';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await connect();

  const { email, password } = req.body;

  const user = await User.findOne({ email, role: 'teacher' });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.status(200).json({ token });
}
