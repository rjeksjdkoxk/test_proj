require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const data = require('./data')
const authorize = require('./authorize')
const logger = require('./logger')
const productRoutes = require('./routes/products')
const tasksRoutes = require('./routes/tasks')
const notFound = require('./middlewares/not-found')
const loginRoutes = require('./routes/login')
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')

const connectDb = require('./db/connect')

const startServer = async () => {
    await connectDb()
}

startServer()
    .then(value => {
        console.log('server started')
        app.listen(process.env.PORT)
    })
    .catch(reason => {
        console.log(reason)
    })

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())

app.use(helmet())
app.use(cors())
app.use(xss())

app.get('/', (req, res) => {
    res.send('home page')
})

app.use('/api/v1/products', productRoutes)

app.use('/api/v1/tasks', tasksRoutes)

app.use(loginRoutes)

app.use(notFound)