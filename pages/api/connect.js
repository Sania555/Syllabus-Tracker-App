import mongoose from 'mongoose';

const connect = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI); // Make sure this matches your .env
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
};

export default connect;
