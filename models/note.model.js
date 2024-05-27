const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const NoteModel = mongoose.model("Note", noteSchema);
module.exports = NoteModel;