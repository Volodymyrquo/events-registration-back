import EventModel from '../models/Event.js'

export const create = async (req,res)=>{
    try {
        const doc = new EventModel({
            title:req.body.title,
            description:req.body.description,
            eventDate:req.body.eventDate,
            organizer:req.body.organizer,
        });

        const post = await doc.save();

        res.json(post)
    } catch (error) {
        console.log(error)
        res.status(500).json({massage:"Cannot create event"})
   
    }
}


export const getAll = async (req,res)=>{
    try {
        const posts = await EventModel.find();
        res.json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json({massage:"Cannot get posts"})
    
    }
}
