import connect from '../connect';
import Syllabus from '../../../models/Syllabus';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connect();
    const syllabusList = await Syllabus.find(); // fetch all syllabus entries
    if (syllabusList.length === 0) {
      return res.status(200).json({ message: 'No syllabus found', syllabus: [] });
    }

    res.status(200).json({ syllabus: syllabusList });
  } catch (error) {
    console.error('Error fetching syllabus:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
