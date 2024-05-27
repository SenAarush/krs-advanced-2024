const jwt = require('jsonwebtoken')
require('dotenv').config()

const auth = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (!authHeader) {
        return res.status(400).json({ error: 'no authorization header' })
    }
    if (!authHeader.startsWith('Bearer ')) {
        return res.status(400).json({ error: 'invalid authorization header' })
    }
    const token = authHeader.split(' ')[1]
    try {
        jwt.verify(token, process.env.SECRET)
        req.body.user = jwt.decode(token, process.env.SECRET).email
        next()
    } catch (e) {
        return res.status(400).json({ error: `${e.message}` })
    }
}

module.exports = auth