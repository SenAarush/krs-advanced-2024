const UserModel = require('../models/user.model')
const bcrypt = require('bcryptjs')

const validators = require('../utils/validators')
const helpers = require('../utils/helpers')

const register = async (req, res) => {
    try {
        const { name, email, pass, cPass } = req.body
        if (!name || !email || !pass || !cPass) {
            return res.status(400).send({ error: 'unable to find required details' })
        }
        if (pass !== cPass) {
            return res.status(400).send({ error: 'password and confirm password do not match' })
        }
        if (!validators.checkEmail(email)) {
            return res.status(400).send({ error: 'invalid email' })
        }
        if (!validators.checkPass(pass)) {
            return res.status(400).send({ error: 'invalid password' })
        }
        const user = await UserModel.findOne({ email })
        if (user) {
            return res.status(400).send({ error: 'user already exists' })
        }
        const hashedPass = await bcrypt.hash(pass, 12)
        const newUser = new UserModel({ name, email, password: hashedPass })
        await newUser.save()
        res.status(200).send({ message: 'user created', user: { name: newUser.name, email: newUser.email } })
    } catch (e) {
        res.json({ error: `${e.message}` }).status(400)
    }
}

const login = async (req, res) => {
    try {
        const { email, pass } = req.body
        if (!email || !pass) {
            return res.status(400).send({ error: 'unable to find required details' })
        }
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).send({ error: 'invalid credentials' })
        }
        const isMatch = await bcrypt.compare(pass, user.password)
        if (!isMatch) {
            return res.status(400).send({ error: 'invalid credentials' })
        }
        const token = helpers.createJWT(user.email)
        res.status(200).send({ message: 'login success', token, user: { name: user.name, email: user.email } })
    } catch (e) {
        res.status(200).json({ message: `error ${e.message}` })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { email } = req.params
        const { pass } = req.body
        if (!email || !pass) {
            return res.status(400).send({ error: 'unable to find required details' })
        }

        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).send({ error: 'invalid credentials' })
        }
        const isMatch = await bcrypt.compare(pass, user.password)
        if (!isMatch) {
            return res.status(400).send({ error: 'invalid credentials' })
        }
        await UserModel.deleteOne({ email })
        res.send({ message: 'User deleted' }).status(200)
    } catch (e) {
        res.send({ error: `${e.message}` }).status(400)
    }
}

module.exports = {
    register,
    login,
    deleteUser
}