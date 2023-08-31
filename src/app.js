const express = require('express')
const morgan = require("morgan")
const app = express()
app.use(express.json())
const beachesRouter = require('./beaches/beaches.router')

const beaches = require('./data/beaches-data')


app.use('/beaches', beachesRouter)




// Not found handler
app.use((req, res, next) => {
    console.log(error)
    res.send(error)
})

// Error handler
app.use((error, req, res, next) => {
    console.log(error)
    const { status = 500, message = 'Something went wrong!' } = error
    res.status(status).json({ error: message })
})

module.exports = app