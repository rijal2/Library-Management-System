const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const corsOptions = {
    origin: "http://localhost:3000"
}
const app = express()
const { CustomAPIError, NotFoundError } = require('./app/errors/exceptions')


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

//Error
const errorHaldlerMiddlewares = require('./app/errors/middlewares/handler-error')
const notFound = require('./app/errors/middlewares/not-found')

// Router
const v1 = '/v1/be'
const rolesRouter = require("./app/api/v1/controller/roles/route")
const userRouter = require("./app/api/v1/controller/users/route")
const adminRouter = require("./app/api/v1/controller/admin/route")
const authRouter = require("./app/api/v1/controller/auth/route")

app.use(`${v1}`, rolesRouter)
app.use(`${v1}`, userRouter)
app.use(`${v1}`, adminRouter)
app.use(`${v1}`, authRouter)

app.get('/', (req, res) => {
    res.send("Selamat datang di book service manager");
})

//Error Middlewares
app.use(errorHaldlerMiddlewares)
app.use(notFound)

app.listen(`3000`, () => {
    console.log(`Server sedang berjalan di port http://localhost:3000`)
})