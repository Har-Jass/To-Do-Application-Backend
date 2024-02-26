// importing JWT Package for creating Tokens when User Logged In
const jwt = require('jsonwebtoken');

// configuring dotenv file
require('dotenv').config();

// fetching the secret key from .env file
const secretKey = process.env.JWT_SECRET;

// this function authenticate that the token is valid token or not
const authenticateToken = async (req, res, next)=>{
    // fetching the token from the header
    let token = req.header('Authorization');

    // if token not found, then we send the failed response to the user
    if(!token) {
        return res.status(401).send({
            message:'Authentication Failed! Token Not Found!'
        });
    }

    // if token found then we verify the token, that its a valid token or not
    // or the time limit of the token is not expired

    // 3rd parameter is a callback function, where "err" is the error object and "user" is the normal object
    // "err" -> If there is an error during the verification process, this parameter will contain an error object. If verification is successful, "err" will be "null"
    // If there's an issue, the err object will provide information about the error, such as the reason for verification failure.

    // "user" -> If verification is successful, this parameter will contain the decoded payload of the JWT
    // The decoded payload is a JavaScript object representing the information stored in the original JWT's payload section
    // It typically includes claims like "issuer" (iss), "subject" (sub), "audience" (aud), "expiration time" (exp), and others.
    jwt.verify(token, secretKey, (err, user) => {
        // if there is an error in token
        // then we send the failed response to the user, that token is not valid
        if(err) {
            return res.status(403).send({
                message:"Token Not Valid! Please Login Again!"
            });
        }

        // if token is valid then we add the token in the user object
        // if any of the controller wants to access the value of the user, it can access with the help of "req.user"
        req.user = user;

        // and jump to the next middleware
        // after completing the above tasks, it will jump to the next task specified in the route of the ToDoRoutes
        next();
    });

}

// exporting the function which authenticate the token
module.exports = authenticateToken;