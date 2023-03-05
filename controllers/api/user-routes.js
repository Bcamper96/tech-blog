const router = require('express').Router()
const { User, Post } = require('../../models')

// CREATE a new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      // Set the username, email, and password of the new user to the values in the request body
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })

    // Save the user's session information and return the new user data
    req.session.save(() => {
      req.session.loggedIn = true
      req.session.user = dbUserData

      res.status(200).json(dbUserData)
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// Login a user
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: { email: req.body.email }
    })

    // If the user does not exist, return a 400 error
    if (!dbUserData) {
      res.status(400)
        .json({ message: 'Incorrect email or password. Please try again!' })
      return
    }

    const validPassword = await dbUserData.checkPassword(req.body.password)

    // If the password is invalid, return a 400 error
    if (!validPassword) {
      res.status(400)
        .json({ message: 'Incorrect email or password. Please try again!' })
      return
    }

    // Save the user's session information and return the user data and a success message
    req.session.save(() => {
      req.session.loggedIn = true
      req.session.user = dbUserData

      res.status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' })
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// Logout a user
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    // Destroy the user's session and return a 204 status code
    req.session.destroy(() => {
      res.status(204).end()
    })
  } else {
    // If the user is not logged in, return a 404 error
    res.status(404).end()
  }
})

// GET all posts by a user
router.get('/:id/posts', async (req, res) => {
  try {
    // If the user is not logged in and the requested id is 0, return a 400 error
    if (req.params.id == 0 && !req.session.loggedIn) {
      res.status(400).json({ message: 'Not logged in' })
      return
    }

    // If the requested id is 0, use the user id from the session data
    const id = (req.params.id == 0) ? req.session.user.id : req.params.id
    const posts = await Post.findAll({
      // Find all posts where the user_id matches the requested id
      where: { user_id: id },
      // Order posts by date_created in descending order
      order: [['date_created', 'DESC']],
      // Limit the result to the 15 most recent posts
      limit: 15
    })

    res.json(posts)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

module.exports = router
