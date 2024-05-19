const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'TestKRSUser'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
})

const TodoModel = mongoose.model("TestKRSTodo", todoSchema);
module.exports = TodoModel;