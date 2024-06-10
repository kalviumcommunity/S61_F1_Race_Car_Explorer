const mongoose = require('mongoose');
require('dotenv').config();

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.DATABASE_URI);
//         console.log('MongoDB connected');
//     } catch (err) {
//         console.error('MongoDB connection error:', err);
//         process.exit(1); 
//     }
// };
const connectDB = mongoose.connect(process.env.DATABASE_URI)


module.exports = connectDB;
