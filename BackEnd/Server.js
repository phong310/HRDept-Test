const express = require('express');
const mongoose = require("mongoose")
const dotenv = require('dotenv')
const cors = require("cors");
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")
const User = require("./router/User")
const Auth = require("./router/Auth")

dotenv.config()
const app = express()

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json())
app.use(cors())

const PORT = process.env.PORT || 5000;

// ROUTER
app.use('/user-managerment', User)
app.use('/auth', Auth)


// CONNECT DATABASE
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('CONNECT TO MONGO DB');
    })
    .catch((error) => {
        console.error('Error connecting to database', error);
    });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
});
