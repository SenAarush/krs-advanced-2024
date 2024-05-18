const UserModel = require('../models/user.model');
const bcrypt = require('bcryptjs');

const validators = require('../utils/validators');
const helpers = require('../utils/helpers');

const register = async (req, res) => {
    try {
        const { name, email, pass, cPass } = req.body;
        if (!name || !email || !pass || !cPass) {
            return res.send({ error: "unable to find required details" }).status(400);
        }
        if (pass !== cPass) {
            return res.send({ error: "password and confirm password do not match" }).status(400);
        }
        if (!validators.checkEmail(email)) {
            return res.send({ error: "invalid email" }).status(400);
        }
        if (!validators.checkPass(pass)) {
            return res.send({ error: "invalid password" }).status(400);
        }
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.send({ error: "user already exists" }).status(400);
        }
        const hashedPass = await bcrypt.hash(pass, 12);
        const newUser = new UserModel({ name, email, password: hashedPass });
        await newUser.save();
        res.send({ message: "user created successfully" }).status(200);
    } catch (e) {
        res.json({ error: `${e.message}` }).status(400);
    }
}

const login = async (req, res) => {
    try {
        const { email, pass, cPass } = req.body;
        if (!email || !pass || !cPass) {
            return res.send({ error: "unable to find required details" }).status(400);
        }
        if (pass !== cPass) {
            return res.send({ error: "password and confirm password do not match" }).status(400);
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.send({ error: "invalid credentials" }).status(400);
        }
        const isMatch = await bcrypt.compare(pass, user.password);
        if (!isMatch) {
            return res.send({ error: "invalid credentials" }).status(400);
        }
        const token = helpers.createJWT(user.email);
        res.cookie('authToken', token, { httpOnly: true }).send({ message: "login successful" }).status(200);
    } catch (e) {
        res.json({ message: `error ${e.message}` }).status(400);
    }
}

const deleteUser = async (req, res) => {
    try {
        const { email } = req.params;
        const { pass } = req.body;
        if (!email || !pass) {
            return res.status(400).send({ error: "unable to find required details" });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).send({ error: "invalid credentials" });
        }
        const isMatch = await bcrypt.compare(pass, user.password);
        if(!isMatch) {
            return res.status(400).send({error: "invalid credentials"});
        }
        await UserModel.deleteOne({ email });
        res.send({ message: "user deleted successfully" }).status(200);
    } catch (e) {
        res.send({ error: `${e.message}` }).status(400);
    }
}


module.exports = {
    healthCheck,
    register,
    login,
    protected,
    deleteUser
}