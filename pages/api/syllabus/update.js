import connect from '../connect';
import Syllabus from '../../../models/Syllabus';

export default async function handler(req, res) {
  await connect();
  const { id, subject, content } = req.body;

  const updated = await Syllabus.findByIdAndUpdate(id, { subject, content }, { new: true });

  if (!updated) return res.status(404).json({ message: 'Syllabus not found' });

  res.status(200).json(updated);
}
