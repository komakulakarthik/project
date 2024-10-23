const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
    position: { type: String },
    department: { type: String },
    // Add other staff-specific fields
}, { timestamps: true });

module.exports = mongoose.model('Staff', staffSchema);
