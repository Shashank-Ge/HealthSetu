const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, './.env') });

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI is not defined in the environment variables.");
  process.exit(1);
}

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

async function createAdmin() {
  try {
    const hashedPassword = await bcrypt.hash('admin1', 10); //enter_admin_detail
    const admin = new Admin({
      name: 'admin1',              //enter_admin_detail
      email: 'admin1@example.com',            //enter_admin_detail
      password: hashedPassword,              //hashed password stored
    });

    await admin.save();
    console.log('Admin created successfully');
  } catch (error) {
    console.error('Error creating admin:', error.message);
  } finally {
    mongoose.disconnect();
  }
}

createAdmin();
