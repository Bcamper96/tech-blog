const router = require('express').Router()
const { Post, User, Comment } = require('../models')

// Homepage route
router.get('/', async (req, res) => {
  try {
    // Render the homepage template and pass in the user session data
    res.render('homepage', {
      loggedIn: req.session.loggedIn,
      user: req.session.user,
    })
  }
  catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// Dashboard route
router.get('/dashboard', async (req, res) => {
  try {
    // If the user is not logged in, redirect to the homepage
    if (!req.session.loggedIn) res.redirect('/')

    // Render the dashboard template and pass in the user session data
    res.render('dashboard', {
      loggedIn: req.session.loggedIn,
      user: req.session.user,
    })
  }
  catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// Edit post route
router.get('/posts/:id/edit', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: { exclude: 'password' } },
        { model: Comment },
      ],
    })

    // If the post does not exist, redirect to the homepage
    if (!post) {
      res.redirect('/')
      return
    }

    // If the user is not the owner of the post, redirect to the homepage
    if (!(req.session.loggedIn && req.session.user.id === post.user.id)) {
      res.redirect('/')
      return
    }

    // Render the editor template and pass in the user session data and the post data
    res.render('editor', {
      loggedIn: req.session.loggedIn,
      user: req.session.user,
      post: post.dataValues
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// View post route
router.get('/post/:id', (req, res) => {
  try {
    // Render the viewer template and pass in the user session data and the post ID
    res.render('viewer', {
      loggedIn: req.session.loggedIn,
      user: req.session.user,
      postId: req.params.id
    })
  } catch (err) {
    console.log(err)
    res.status(err)
  }
})

// New post route
router.get('/new-post', (req, res) => {
  try {
    // If the user is not logged in, redirect to the homepage
    if (!req.session.loggedIn) res.redirect('/')

    // Render the poster template and pass in the user session data
    res.render('poster', {
      loggedIn: req.session.loggedIn,
      user: req.session.user
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// Login route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/')
    return
  }

  // Render the login template and pass in the user session data
  res.render('login', {
    loggedIn: req.session.loggedIn
  })
})

module.exports = router
