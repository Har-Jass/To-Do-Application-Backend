// importing ToDo model from models folder
const ToDo = require("../models/ToDoList");

// function to create a new todo task
exports.createToDo = async(req,res)=>{
    try {
        // step 1 -> fetch the data from request body
        const data = req.body;

        // step 2 -> pass the data to the todo model
        const todo = new ToDo(data);

        // step 3 -> save the data in the database
        // const result = await todo.save();
        await todo.save();

        // step 4 -> printing the result on the console
        // console.log(result);

        // step 5 -> send the success status to the user that new task is created
        res.status(201).send({message: "Created New Task !"});
    }
    catch(err) {
        // console.log(err);
        res.status(err);
    }
}

// function to fetch all the todo tasks
exports.getAllToDo = async(req,res)=>{
    // step 1 -> fetching the user id from the request parameter
    let {userId} = req.params;

    try {
        // step 2 -> finding all the todo tasks that corresponds to the current user in the database
        const result = await ToDo.find({createdBy:userId});

        // step 3 -> send the response in return
        res.send(result);
    }
    catch(err) {
        // console.log(err);
        res.status(400).send(err);  
    }

}

// function to update an already created todo task
exports.updateToDo = async(req,res)=>{
    try {
        // step 1 -> fetch the id of the todo task from the request parameter
        const {id} = req.params;

        // step 2 -> fetching the new data of the todo task
        const data = req.body;

        // step 3 -> find the todo task in the database and update it with the new data
        // const result = await ToDo.findByIdAndUpdate(id, 
        //                                                 {
        //                                                     $set:data
        //                                                 },
        //                                                 {
        //                                                     returnOriginal:false
        //                                                 }
        // );
        await ToDo.findByIdAndUpdate(id, 
            {
                $set:data
            },
            {
                returnOriginal:false
            }
        );

        // printing the result on the console
        // console.log(result);

        // step 4 -> send the success status to the user that task is updated
        res.send({message:'ToDo list Updated!'})
    }
    catch(err) {
        // console.log(err);
        res.status(400).send(err);
    }
}

// function to delete an already created todo task
exports.deleteToDo = async(req,res)=>{
    try {
        // step 1 -> fetch the id of the todo task from the request parameter
        const {id} = req.params;

        // step 2 -> find the todo task in the database and delete it
        // const result = await ToDo.findByIdAndDelete(id);
        await ToDo.findByIdAndDelete(id);

        // printing the result on the console
        // console.log(result);

        // step 3 -> send the success status to the user that task is deleted
        res.send({message:"ToDo Task Deleted!"});
    }
    catch(err) {
        // console.log(err);
        res.status(400).send(err);
    }
}