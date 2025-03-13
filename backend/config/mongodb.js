import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        console.log(process.env.MONGODB_URI)
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('db connected successfully');
    } catch (err) {
      console.log(err);
      console.log('problem in connecting database');
    }
  };
