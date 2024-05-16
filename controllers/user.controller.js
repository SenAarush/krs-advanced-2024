const UserModel = require('../models/user.model');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.create({ name, email, password });
    } catch (error) {
        res.json({message: `error ${error.message}`}).status(400);
    }
}

const healthCheck = (req, res) => {
    res.send({ message: "hello from user" }).status(200);
}


module.exports = {
    healthCheck
}