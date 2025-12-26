const mongoose = require('mongoose');
require('dotenv').config();

const dbUrl =
  process.env.MONGO_URL ||
  'mongodb+srv://nandhu63009:nandhu630091@emailcluster.u6aqeeh.mongodb.net/userinfo';

if (!dbUrl) {
  console.error('MONGO_URL / dbUrl not set in .env');
  process.exit(1);
}
const connectedDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log('MongoDB connected successfully');
  }catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
module.exports = connectedDB;
