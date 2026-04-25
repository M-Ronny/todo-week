const Todo = require('../models/todoWeek')

module.exports = {
    getTodoWeek: async (req, res) => {
        try {
            const todoItems = await Todo.find()
            res.render('todoWeek.ejs', {todos: todoItems})
        } catch(err) {
            console.log(err)
        }
    },
    createTodo: async (req, res) => {
        try{
            await Todo.create({todo: req.body.todo, day: req.body.day, completed: false})
            console.log('Todo has been added!')
            res.redirect('/todoWeek')
        } catch(err) {
            console.log(err)
        }
    },
    markComplete: async (req, res) => {
        try {
            await Todo.findOneAndUpdate({_id: req.body.idFromJS}, {
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        } catch(err) {
            console.log(err)
        }
    },
    markIncomplete: async (req, res) => {
        try {
            await Todo.findOneAndUpdate({_id:req.body.idFromJS}, {
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        } catch(err) {
            console.log(err)
        }
    },
    deleteTodo: async (req, res) => {
        console.log(req.body.todoIdFromJSFile)
        try {
            await Todo.findOneAndDelete({_id:req.body.idFromJS})
            console.log('Deleted Todo')
            res.json('Deleted It')
        } catch(err) {
            console.log(err)
        }
    }
}