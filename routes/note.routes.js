const express = require('express')
const router = express.Router()

const controller = require('../controllers/note.controller')

const auth = require('../middleware/auth')

router.get('/', auth, controller.getNotes)
router.post('/', auth, controller.createNote)
router.patch('/:noteId', auth, controller.editNote)
router.patch('/:noteId/pin', auth, controller.pinNote)
router.delete('/:noteId', auth, controller.deleteNote)

module.exports = router