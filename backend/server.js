const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const port = process.env.PORT || 3000;

const routes = require('./routes');
const passport = require('./passport/config');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(passport.initialize());
app.use(routes);

// protected route

app.listen(port, () => {
    const connectToMongoDB = async (uri) => {
        try {
            console.log("Connecting to DB");
            await mongoose.connect(uri);
            console.log("Connected to MongoDB database")
        } catch (error) {
            console.log(`Error occured : ${error.message}`);
        }
    }

    connectToMongoDB(process.env.MONGODB_URI);

    console.log(`Server running on port ${port}.`);
})