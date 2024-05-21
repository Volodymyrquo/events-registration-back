import mongoose from 'mongoose';

const ParticipantSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    resource: {
        type: String,
        required: true,
    },
    event: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
        },
    ],
});

export default mongoose.model('Participant', ParticipantSchema);
