import connect from '../connect';
import Syllabus from '../../../models/Syllabus';

export default async function handler(req, res) {
  await connect();
  const { subject, content, createdBy } = req.body;
  const syllabus = new Syllabus({ subject, content, createdBy });
  await syllabus.save();
  res.status(201).json(syllabus);
}
