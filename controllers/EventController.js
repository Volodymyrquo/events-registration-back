import EventModel from '../models/Event.js';

export const create = async (req, res) => {
    try {
        const doc = new EventModel({
            title: req.body.title,
            description: req.body.description,
            eventDate: req.body.eventDate,
            organizer: req.body.organizer,
            participant: req.body.participant,
        });

        const post = await doc.save();

        res.json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({ massage: 'Cannot create event' });
    }
};

export const getAll = async (req, res) => {
    try {
        const { page, pageSize, sortBy, sortDirection } = req.query;
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const events = await EventModel.find()
            .sort({ [sortBy]: sortDirection })
            .populate('participant')
            .exec();
        const paginatedEvents = events.slice(startIndex, endIndex);
        const totalPages = Math.ceil(events.length / pageSize);
        res.json({ events: paginatedEvents, totalPages });
    } catch (error) {
        console.log(error);
        res.status(500).json({ massage: 'Cannot get events' });
    }
};
export const getOne = async (req, res) => {
    try {
        const eventId = req.params.id;
        const doc = await EventModel.findOne({
            _id: eventId,
        })
            .populate('participant')
            .exec();
        if (!doc) {
            return res.status(404).json({
                message: 'Event not found',
            });
        }
        res.json(doc);
    } catch (error) {
        console.log(error);
        res.status(500).json({ massage: 'Cannot get events' });
    }
};
