// importing User model from models folder
const User = require('../models/User');

// importing JWT Package for creating Tokens when User Logged In
const jwt = require('jsonwebtoken');

// configuring dotenv file
require('dotenv').config();

// fetching the secret key from .env file
const secretKey = process.env.JWT_SECRET;

// whenever the new user will try to register then this function is called
async function registerUser(req, res) {
    // to register new user we need to collect the user details from request's body, i.e., first name, last name, username and password
    let {firstName, lastName, username, password} = req.body;

    try {
        // check that the user with entered username is already present or not
        const duplicate = await User.find({username});

        // if user with entered username already present then we just return with the message
        if(duplicate && duplicate.length > 0) {
            return res.status(400).send({
                message: 'User already registered with this username'
            })
        }
        
        // igf the user with entered username not present
        // then we register the new user, with the entered details
        // using the model we pass all the data in the database
        let user = new User({firstName, lastName, username, password});

        // saving the user to the database
        // const result = await user.save();
        // console.log(result);
        await user.save();

        // sending the success response
        res.status(201).send({
            message: "User registered successfully"
        });
    }
    catch(err) {
        // console.log(err);
        res.status(400).send(err);
    }
}

// whenever an user want to login to the app, then this function is called
// and whenever user logged in, we create a JWT Token of that User
async function loginUser(req, res) {
    try {
        // to login new user we need to collect the user details from request's body, username and password
        const {username, password} = req.body;

        // first we find that the user with entered username is present in the database or not
        const user = await User.findOne({username});

        // if user is not present, means the user is not registered, so we send the error response
        if(!user) {
            return res.status(404).send({
                message: 'Sorry, this username is not registered'
            })
        }

        // if the user present, then check the entered user's password is correct or not
        // for this we can compare the entered password with the corresponding username's password
        // and to compare the passwords we have created the function in the User Model
        // so we use that function to compare the password
        const isPasswordValid = await user.comparePassword(password);

        // if the password is not valid, then we send the error response
        if(!isPasswordValid) {
            return res.status(404).send({
                message: 'Oops! Incorrect password'
            })
        }

        // if the entered username is registered and the password is also correct
        // means the user is valid, so first we create a token of the logged in user
        // we create a token for the user based on the user id
        // here we have created a JWT token for the user that just logged in
        // the token is allowed for the user's id and also we have send the secret key with the token and also we mentioned the expiry time of the token, i.e., 1 hour
        let token = await jwt.sign({ userId: user?._id }, secretKey, { expiresIn: '1h' });

        // when the user successfully logged in, we will send the final data of the user in response
        // the final data includes user's id, user's username, user's first name and last name and the created jwt token
        let finalData = {
            userId: user?._id,
            username: user?.username,
            firstName: user?.firstName,
            lastName: user?.lastName,
            token: token
        };

        // send the success response and also send the final data in response
        return res.status(200).send({
            message: 'User logged in successfully.',
            finalData
        })
    }
    catch(err) {
        // console.log(err);
        res.status(400).send(err);
    }
}

const AuthController = {
    registerUser,
    loginUser
}

module.exports = AuthController;