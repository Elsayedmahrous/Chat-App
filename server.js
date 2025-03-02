const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mountRouters = require('./Routes/index');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config({ path: 'config.env' });

mongoose.connect(process.env.BD_URL).then((conn) => {
    console.log(`Database Connected`);
})

mountRouters(app)

if (process.env.NODE_DEV === 'Development') {
    app.use(morgan('dev'));
    console.log(`mode: ${process.env.NODE_DEV}`)
}


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`App running ${PORT} ...`)
})