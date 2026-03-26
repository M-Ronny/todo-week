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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})