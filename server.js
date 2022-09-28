const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const corsOptions = {
    origin: "http://localhost:3000"
}
const app = express()


app.use(morgan('dev'))
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Connect to database
const db = require('./app/api/v1/database/models/index')
// console.log(db.sequelize)
db.sequelize.authenticate()
    .then(() => {
        console.log('Connected');
    })
    .catch(e => {
        console.log('unconect', e);
    })

//Router
// const v1 = '/v1/be'
// const booksRouter = require("./router/books")
// const userRouter =require("./router/users")

// app.use(`${v1}`, booksRouter)
// app.use(`${v1}`, userRouter)

app.get('/', (req, res) => {
    res.send("Selamat datang di book service manager");
})

app.listen(`3000`, () => {
    console.log(`Server sedang berjalan di port http://localhost:3000`)
})