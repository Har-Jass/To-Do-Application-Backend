// importing express package
const express = require('express');

// creating express instance
const app = express();

// importing cors package
// "cors" is like a security guard for web browsers that decides whether a website from one domain is allowed to request resources from another domain.
const cors = require('cors');

// importing mongoose package
const mongoose = require('mongoose');

// importing authRoutes file
const authRoutes = require('./routes/authRoutes');
const toDoRoutes = require('./routes/ToDoRoutes');

// configuring dotenv file
require('dotenv').config();

// fetching port no. from .env file
const PORT = process.env.PORT || 5000;

// initializing middlewares
app.use(cors());

// we will be sending our data in the json format from the front-end
// so to understand that data we have to add this middleware, which will basically add the header that tells that this is the application json data
app.use(express.json());

// mounting routes
app.use('/api', authRoutes);
app.use('/api/todo', toDoRoutes);

// connecting mongoose
// mongoose will connect our express application with our database
// and it will take database url from env file
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("DB Connected Successfully!"))
.catch((err) => {
    console.log("DB Connection Failed");
    console.error(err);
    process.exit(1);
});

// adding default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: `Your Server is Up & Running at Port No. ${PORT}`
    });
})

// running the port
app.listen(PORT, () => {
    console.log(`Server Started at Port No. -> ${PORT}`);
});