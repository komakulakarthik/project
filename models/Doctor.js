const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
    specialty: { type: String },
    licenseNumber: { type: String },
    // Add other doctor-specific fields
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
