const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
// Adding our dotenv file
dotenv.config();

// Naming Port
const port = process.env.PORT || 5000;

// Importing routes/routers
const loginRoute = require('./routes/Login.route');
const userRoute = require('./routes/User.route');
const artistRoute = require('./routes/Artist.route');
const projectRoute = require('./routes/Project.route');
const sessionRoute = require('./routes/Session.route');
const paymentRoute = require('./routes/Payment.route');
const appointmentRoute = require('./routes/Appointment.route');

// Connecting to MongoDB
mongoose.connect(
    process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    () => {
        console.log('Connected To MongoDB sucessfully')
    }
);

// Adding app Middlewares
app.use(cors());
app.use(express.json());
app.use('/login', loginRoute);
app.use('/user', userRoute);
app.use('/artist', artistRoute);
app.use('/project', projectRoute);
app.use('/session', sessionRoute);
app.use('/payment', paymentRoute);
app.use('/appointment', appointmentRoute);

app.listen(port, () => {
    console.log(`Server is now listening on port : ${port}`)
});