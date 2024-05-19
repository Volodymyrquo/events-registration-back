import mongoose from "mongoose";

const EventSchema = mongoose.Schema({
    title:{
        type: String,
        required:true
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
        required:true}
    
})

export default mongoose.model("Event", EventSchema)