// importing express package
const express = require('express');

// importing CRUD functions from Todo controller
const { createToDo, getAllToDo,deleteToDo,updateToDo } = require('../controllers/toDoController');

// to secure the routes, we use middleware, this middleware will first check that the user is valid or not
// or the token is valid or not before jumping to the todo routes, and its specified controller
const authenticateToken = require('../middleware/authJwt');

// creating router object using express's router function
// this router object will allow us to create routes
const router = express.Router();

// specifying create todo route, which creates a new todo task
// before going to any route, we check that the token or the user is valid or not
router.post('/create-to-do', authenticateToken, createToDo);

// specifying get todo route, which fetch all the routes of the current logged in user, we pass the user id in the route parameter
// before going to any route, we check that the token or the user is valid or not
router.get('/get-all-to-do/:userId', authenticateToken, getAllToDo);

// specifying delete todo route, which delete a specific route, we pass the id of the route which we want to delete in the route parameter
// before going to any route, we check that the token or the user is valid or not
router.delete('/delete-to-do/:id', authenticateToken, deleteToDo);

// specifying update todo route, which updates a specific route, we pass the id of the route which we want to update in the route parameter
// before going to any route, we check that the token or the user is valid or not
router.patch('/update-to-do/:id', authenticateToken, updateToDo);

// exporting the router 
module.exports = router;