const express = require('express')
const hbs = require('hbs')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

require('./db/mongoose')
const userRouter = require('./routers/users')
const movieRouter = require('./routers/movies')

const app = express()

const viewsPath = path.join(__dirname, '../templates/views')
const publicPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.json())
app.use(express.static(publicPath))
app.use(cookieParser())
app.use(userRouter)
app.use(movieRouter)

app.get('', (req, res) => {
    let loggedIn = false
    if (req.cookies.token) {
        loggedIn=true
    }
    res.render('index', {
        title: 'MovieZ',
        active1: 'active',
        loggedIn,
        toastMessage: req.query.toastMessage
    })
})


const port  = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Server started on port ' + port)
})