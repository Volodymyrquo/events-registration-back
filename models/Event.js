import mongoose from "mongoose";

const EventSchema = mongoose.Schema({
    title:{
        type: String,
        required:true,
        unique:true
    },
    description:{
        type: String,
        required:true
    },
    eventDate:{
        type: Date,
        required:true
    },
    organizer:{
        type: String,
        required:true},
    participant:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Participant"
        }
    ]
    
})

export default mongoose.model("Event", EventSchema)
