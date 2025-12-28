import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        default: 'new',
        enum: ['new', 'read', 'archived']
    }
}, {
    timestamps: true
});

const contactModel = mongoose.model('Contact', contactSchema);

export default contactModel;