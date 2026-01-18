const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};
mongoose.connect("mongodb://127.0.0.1:27017/HostelVSerse")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));
  
module.exports = connectDB;
