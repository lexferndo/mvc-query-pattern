require('dotenv').config()

const PORT = process.env.PORT

const express = require('express')
const bodyPaser = require('body-parser')

const morgan = require('morgan')

const app = express()

app.use(bodyPaser.json())
app.use(bodyPaser.urlencoded({ extended: true }))


const middleWare = require('./middleware/request.js')

const movies = require('./router/movies.js')

const users = require('./router/users.js')

const auth = require('./router/auth.js')

const swaggerUI = require('swagger-ui-express')

const { authentication } = require('./middleware/auth.js')



app.use('/auth', auth)

app.use(morgan('tiny'))

app.use('/movies', middleWare.getMovies)
app.use(authentication)
app.use('/movies', movies)

app.use('/users', middleWare.getUsers)
app.use('/users', users)


app.listen(PORT, () => {
    console.log(`Server Connected with Port ${PORT}`)
})