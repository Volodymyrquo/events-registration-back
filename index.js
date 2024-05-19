import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import { EventController } from './controllers/index.js';

mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("DB ok"))
.catch((err)=>console.log("DB error", err))

const app = express()
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("Hello World!")
})

app.get('/events',EventController.getAll)
app.post('/events', EventController.create)
app.listen(process.env.PORT,(err)=>{
    if(err){
    return    console.log(err)
    }
    console.log(`Server is running on port ${process.env.PORT}`)
})
