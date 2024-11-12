import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
   await mongoose
  .connect(
    "mongodb+srv://User:Fanthom456world@cluster0.paigpn8.mongodb.net/Todo_Task?retryWrites=true&w=majority"
  )
  
    console.log('MongoDB connected');
  } catch (error) {
    // console.error(error);
       console.log("MongoDB connection failed")
    process.exit(1);
  }
};


