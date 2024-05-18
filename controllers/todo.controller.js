const UserModel = require('../models/user.model');
const TodoModel = require('../models/todo.model');

const getTodos = async (req, res) => {
    try {
        const { user } = req.body;
        if (!user) {
            return res.status(400).send({ error: "unable to find required details" });
        }
        const userExists = await UserModel.findOne({ email: user });
        if (!userExists) {
            return res.status(400).send({ error: "invalid credentials" });
        }
        const todos = await TodoModel.find({ userId: userExists._id });
        if (!todos) {
            return res.status(400).send({ message: "no todos found" });
        }
        res.status(200).json({ todos: todos });
    }
    catch (e) {
        res.status(400).send({ error: `${e.message}` });
    }
}

const createTodo = async (req, res) => {
    const { title, description, status, user } = req.body;
    if (!title || !description || status === undefined || !user) {
        return res.status(400).send({ error: "unable to find required details" });
    }
    try {
        const userExists = await UserModel.findOne({ email: user });
        if (!userExists) {
            return res.status(400).send({ error: "email not found" });
        }
        const newTodo = new TodoModel({ title, description, status, userId: userExists._id });
        await newTodo.save();
        res.status(200).send({ message: "todo created successfully" });
    } catch (e) {
        res.status(400).send({ error: `${e.message}` });
    }
}

const editTodo = async (req, res) => {
    const todoID = req.params.todoID;
    const { title, description, status } = req.body;
    if (!todoID || !title || !description || status === undefined) {
        return res.status(400).send({ error: "unable to find required details" });
    }
    try {
        const todo = await TodoModel.findOne({ _id: todoID });
        if (!todo) {
            return res.status(400).send({ error: "todo not found" });
        }
        todo.title = title;
        todo.description = description;
        todo.status = status;
        await todo.save();
        res.status(200).send({ message: "todo updated successfully" });
    } catch (e) {
        res.status(400).send({ error: `${e.message}` });
    }
}

module.exports = {
    getTodos,
    createTodo,
    editTodo
}