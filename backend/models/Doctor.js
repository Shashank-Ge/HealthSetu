const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  
  name: {
    type : String,
    required : true,
  },
  
  email: {
    type : String,
    required : true,
  },
  
  password: { 
    type : String,
    required : true,
  },

  specialization: {
    type: String,
    enum: [
      'Cardiologist',
      'Neurologist',
      'Dermatologist',
      'Pediatrician',
      'Orthopedic Surgeon',
      'Psychiatrist',
      'Oncologist',
      'Endocrinologist',
      'Gynecologist',
      'Gastroenterologist',
      'Nephrologist',
      'Pulmonologist',
      'Ophthalmologist',
      'ENT Specialist',
      'Urologist',
      'General Physician'
    ],
    required: true
  },

  profileImage: {
    type: String,
    default: null
  },

  collegeName: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'blocked'],
    default: 'pending'
  },

  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }
});

module.exports = mongoose.model('Doctor', doctorSchema);
