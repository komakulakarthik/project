const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
    medicalHistory: { type: String },
    allergies: { type: String },
    medications: { type: String },
    // Add other patient-specific fields
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
