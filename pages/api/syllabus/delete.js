import connect from '../connect';
import Syllabus from '../../../models/Syllabus';

export default async function handler(req, res) {
  await connect();
  const { id } = req.body;

  const deleted = await Syllabus.findByIdAndDelete(id);

  if (!deleted) return res.status(404).json({ message: 'Syllabus not found' });

  res.status(200).json({ message: 'Deleted successfully' });
}
