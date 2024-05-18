const express = require('express');
const router = express.Router();

const controller = require('../controllers/todo.controller');

const auth = require('../middleware/auth');

router.get('/', auth, controller.getTodos);
router.post('/', auth, controller.createTodo);
router.patch('/:todoID', auth, controller.editTodo);

module.exports = router;