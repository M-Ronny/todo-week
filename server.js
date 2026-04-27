const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const todoWeekRoutes = require('./routes/todoWeek')
// const MongoClient = require('mongodb').MongoClient
// const { ObjectId } = require('mongodb')
// const PORT = 9000

require('dotenv').config({path: './config/.env'})

require('./config/passport')(passport)

connectDB()

// let db,
//     dbConnectionStr = process.env.DB_STRING,
//     dbName = 'todos'

// MongoClient.connect(dbConnectionStr)
//     .then(client => {
//         console.log(`Connected to ${dbName} Database`)
//         db = client.db(dbName)
//     })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(logger('dev'))

app.use( 
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection})
    })
)

app.use(passport.instialize())
app.use(passport.session())

app.use(flash())

app.use('/', homeRoutes)
app.use('/todoWeek', todoWeekRoutes)

// app.get('/', (request, response) => {
//     db.collection('todos').find().toArray()
//     .then(data => {
//         response.render('index.ejs', {info: data})
//     })
//     .catch(error => console.error(error))
// })

// app.post('/addTodo', (request, response) => {
//     db.collection('todos').insertOne({todo: request.body.todo, day: request.body.day, complete: false})
//     .then(result => {
//         console.log('To do list added')
//         response.redirect('/')
//     })
//     .catch(error => console.error(error))
// })

// app.put('/markComplete', (request, response) => {
//     db.collection('todos').updateOne({_id: new ObjectId(request.body.idFromJS)}, {
//         $set: {
//             complete: true
//         }
//     }, {
//         sort:{_id: -1},
//         upsert: false
//     })
//     .then(result => {
//         console.log('Marked Complete')
//         response.json('Marked Complete')
//     })
//     .catch(error => console.error(error))
// })

// app.put('/incompleteTodo', (request, response) => {
//     db.collection('todos').updateOne({_id: new ObjectId(request.body.idFromJS)}, {
//         $set: {
//             complete: false
//         }
//     }, {
//         sort:{_id: -1},
//         upsert: false
//     })
//     .then(result => {
//         console.log('to do now Incomplete')
//         response.json('to do now Incomplete')
//     })
//     .catch(error => console.error(error))
// })

// app.delete('/deleteTodo', (request, response) => {
//     db.collection('todos').deleteOne({_id: new ObjectId(request.body.idFromJS)})
//     .then(result => {
//         console.log('To do Deleted')
//         response.json('To do Deleted')
//     })
//     .catch(error => console.error(error))
// })

app.listen(process.env.PORT, () => {
    console.log('To Do Week is up and running!')
})