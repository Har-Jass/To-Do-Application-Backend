// creating user model in this file
// when we run our server, our server will create a database in MongoDB
// then in this file we specify our models which will be created in the database

// importing mongoose package
const mongoose = require('mongoose');

// destructuring schema from mongoose
const { Schema } = mongoose;

// importing bcrypt package
// so that we can encrypt the passwords and then store it in database
const bcrypt = require('bcrypt');

// creating user schema
// this schema will provide the structure to our user in the database
const userSchema = new Schema({
    firstName: String,
    lastName: String,
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// below function is for registering the password of the user signed up
// in the userSchema, mongoose provide the "pre" method
// this "pre" method allows user to do some operation before saving the schema in the database collection
// for example., hum chahte hai that password encrypted format me store ho to hum wo operation "pre" method me specify krte hai
userSchema.pre("save", async function(next) {
    // storing current object in "user" variable
    const user = this;

    // if current object is not modified
    // then we don't do anything and jump to next command
    if(!user.isModified('password')) {
        return next();
    }

    // generate salt, i.e., salt means how many no. of round of hashing we want to do for the password
    // the genSalt() function is used to generate a random salt, which is a random value unique to each password hash
    // the salt is then combined with the password before hashing, making it more difficult for attackers to use precomputed tables (rainbow tables) or other common attack methods
    let salt = await bcrypt.genSalt(10);

    // hashing the password, which is synced with the current object
    // also we have combined the salt with the password
    let hash = await bcrypt.hash(user.password, salt);

    // replace the original text password field with the hashed password
    user.password = hash;

    // now jump to next command
    next();
});

// below function is for comparing the password is correct or not while the user logging in
// when the user logged in we have to check the password he entered, with the hashed password associated with his account in the database
// we have to compare both the passwords
userSchema.methods.comparePassword = async function(password) {
    // storing current object in "user" variable
    const user = this;

    // compare function in bcrypt library will compare the password that user entered and the password stored in the database that is associated with the current users account
    return bcrypt.compare(password, user.password);
};

// creating a model using the above schema
const User = mongoose.model("User", userSchema);

// exporting the model
module.exports = User;