const UserModel = require('../models/user.model')
const NoteModel = require('../models/note.model')

const getNotes = async (req, res) => {
    try {
        const { user } = req.body
        if (!user) {
            return res.status(400).send({ error: 'unable to find required details' })
        }
        const userExists = await UserModel.findOne({ email: user })
        if (!userExists) {
            return res.status(400).send({ error: 'invalid credentials' })
        }
        const notes = await NoteModel.find({ userId: userExists._id })
        res.status(200).json({ notes })
    } catch (e) {
        res.status(400).send({ error: `${e.message}` })
    }
}

const createNote = async (req, res) => {
    const { title, content, user } = req.body
    if (!title || !content || !user) {
        return res.status(400).send({ error: 'unable to find required details' })
    }
    try {
        const userExists = await UserModel.findOne({ email: user })
        if (!userExists) {
            return res.status(400).send({ error: 'email not found' })
        }
        const newNote = new NoteModel({ title, content, userId: userExists._id })
        await newNote.save()
        res.status(200).send({ message: 'Note created' })
    } catch (e) {
        res.status(400).send({ error: `${e.message}` })
    }
}

const editNote = async (req, res) => {
    const noteId = req.params.noteId
    const { title, content } = req.body
    if (!noteId || !title || !content) {
        return res.status(400).send({ error: 'unable to find required details' })
    }
    try {
        const note = await NoteModel.findOne({ _id: noteId })
        if (!note) {
            return res.status(400).send({ error: 'note not found' })
        }
        note.title = title
        note.content = content
        await note.save()
        res.status(200).send({ message: 'Note updated' })
    } catch (e) {
        res.status(400).send({ error: `${e.message}` })
    }
}

const pinNote = async (req, res) => {
    const noteId = req.params.noteId
    try {
        const note = await NoteModel.findOne({ _id: noteId })
        if (!note) {
            return res.status(400).send({ error: 'note not found' })
        }
        note.isPinned = !note.isPinned
        await note.save()
        res.status(200).send({ message: 'Note pinned/unpinned' })
    } catch (e) {
        res.status(400).send({ error: `${e.message}` })
    }
}

const deleteNote = async (req, res) => {
    const noteId = req.params.noteId
    try {
        const note = await NoteModel.findOneAndDelete({ _id: noteId })
        if (!note) {
            return res.status(400).send({ error: 'note not found' })
        }
        res.status(200).send({ message: 'Note deleted' })
    } catch (e) {
        res.status(400).send({ error: `${e.message}` })
    }
}

module.exports = {
    getNotes,
    createNote,
    editNote,
    pinNote,
    deleteNote
}