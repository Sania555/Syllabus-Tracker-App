// models/Syllabus.js
import mongoose from 'mongoose';

const SyllabusSchema = new mongoose.Schema({
  subject: String,
  content: String,
  createdBy: String,
});

// 👇 Explicit collection name 'syllabuses'
export default mongoose.models.Syllabus || mongoose.model('Syllabus', SyllabusSchema, 'syllabuses');
