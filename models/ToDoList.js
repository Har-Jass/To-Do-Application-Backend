// importing mongoose package
const mongoose = require('mongoose');

// destructuring schema from mongoose
const { Schema } = mongoose;

// creating todo schema
// this schema will provide the structure to our todo in the database
const toDoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true
    },
    completedOn: String,
    createdBy: {
        ref: "User",
        type: Schema.ObjectId
    }
},
{
    // schema me timestamp add krne se ye hoga ke
    // jese hi koi new entry create hogi database me ya koi purani entry me updation hogi
    // schema automatically timestamp ko store krlega 
    timestamps: true
});

// creating a model using the above schema
const ToDo = mongoose.model("ToDo",toDoSchema);

// exporting the model
module.exports = ToDo; 