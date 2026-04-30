const express = require('express')
const router =  express.Router()
const todoWeekController = require('../controllers/todoWeek')
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, todoWeekController.getTodoWeek)

router.post('/createTodo', todoWeekController.createTodo)

router.put('/markComplete', todoWeekController.markComplete)

router.put('/markIncomplete', todoWeekController.markIncomplete)

router.delete('/deleteTodo', todoWeekController.deleteTodo)

module.exports = router