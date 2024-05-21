import ParticipantModel from '../models/Participant.js';
import EventModel from '../models/Event.js';

export const register = async (req, res) => {
    try {
        const user = await ParticipantModel.findOne({ email: req.body.email });
        if (user) {
            await ParticipantModel.updateOne(
                { _id: user._id },
                { $push: { event: req.body.event } }
            );
            await EventModel.updateOne(
                { _id: req.body.event },
                { $push: { participant: user._id } }
            );
            return res.json({ success: true });
        }
        const doc = new ParticipantModel({
            fullName: req.body.fullName,
            email: req.body.email,
            dateOfBirth: req.body.dateOfBirth,
            resource: req.body.resource,
            event: req.body.event,
        });

        await EventModel.updateOne(
            { _id: req.body.event },
            { $push: { participant: doc._id } }
        );

        const participant = await doc.save();
        res.json(participant);
    } catch (error) {
        console.log(error);
        res.status(500).json({ massage: 'Could not register' });
    }
};

export const getAll = async (req, res) => {
    try {
        const participants = await ParticipantModel.find()
            .populate('event')
            .exec();
        res.json(participants);
    } catch (error) {
        console.log(error);
        res.status(500).json({ massage: 'Cannot get participants' });
    }
};
