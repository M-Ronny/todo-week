const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 9000
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'todos'

MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (request, response) => {
    db.collection('todos').find().toArray()
    .then(data => {
        response.render('index.ejs', {info: data})
    })
    .catch(error => console.error(error))
})

app.post('/addTodo', (request, response) => {
    db.collection('todos').insertOne({todo: request.body.todo, day: request.body.day, complete: false})
    .then(result => {
        console.log('To do list added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/markComplete', (request, response) => {
    db.collection('todos').updateOne({todo: request.body.itemFromJS, day: request.body.dayFromJS}, {
        $set: {
            complete: true
        }
    }, {
        sort:{_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked Complete')
        response.json('Marked Complete')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteRapper', (request, response) => {
    db.collection('todos').deleteOne({stageName: request.body.stageNameS})
    .then(result => {
        console.log('To do Deleted')
        response.json('To do Deleted')
    })
    .catach(error => console.error(error))
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})