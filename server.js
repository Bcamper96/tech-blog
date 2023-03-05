// Import dependencies
require("dotenv") .config()
const path = require('path')
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')

// Initializes Sequelize with session store
const SequelizeStore = require('connect-session-sequelize')(session.Store)

// Import routes and database connection
const routes = require('./controllers')
const sequelize = require('./config/connection')

// Create a new Express application
const app = express()

// Set the port to listen on
const PORT = process.env.PORT

// Configure session options
const sess = {
  secret: 'Cookie Jar',
  cookie: {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict'
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
}

// Use the session middleware with the specified options
app.use(session(sess))

// Create a new instance of Handlebars
const hbs = exphbs.create()

// Set the view engine to use Handlebars
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

// Parse incoming JSON and urlencoded data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')))

// Use the routes defined in the controllers directory
app.use(routes)

// Sync the database and start listening on the specified port
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`\nServer running on port ${PORT}!`))
})
