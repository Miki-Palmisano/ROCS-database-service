if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS;
const PORT = process.env.PORT || 3002;
const collectionUser = require('./routes/users');
const collectionList = require('./routes/lists');

const app = express();

const corsOptions = {
    origin: ALLOWED_ORIGINS
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/user', collectionUser);
app.use('/list', collectionList);

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
});