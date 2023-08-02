const express = require('express');
const mongoose = require('mongoose');
const cors = require('./middlewares/cors');
const auth = require('./middlewares/auth');

const userController = require('./controllers/users');
const workoutController = require('./controllers/workouts');

const connectionString = 'mongodb://127.0.0.1:27017/workout';
const port = 3005;

start();

async function start() {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Database connected');

        mongoose.connection.on('error', (err) => {
            console.error('Database error');
            console.error(err);
        });
    } catch (err) {
        console.error('Database connection failed');
        process.exit(1);
    }

    const app = express();
    app.use(cors());
    app.use(auth());

    app.use(express.json());
    app.get('/', (req, res) => res.send('Welcome my friends!'));
    app.use('/users', userController);
    app.use('/data/workouts', workoutController);

    app.listen(port, () => {
        console.log('Rest service started on port 3005 (http://localhost:3005)');
    });
}





