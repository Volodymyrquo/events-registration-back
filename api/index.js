import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import { EventController, ParticipantController } from '../controllers/index.js';

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());
app.use(cors());

app.get('/events', EventController.getAll);
app.get('/events/:id', EventController.getOne);
app.post('/events', EventController.create);
app.post('/register', ParticipantController.register);
app.get('/participants', ParticipantController.getAll);
app.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server is running on port ${process.env.PORT}`);
});
