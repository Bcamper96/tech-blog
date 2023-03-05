const router = require('express').Router()
const { Post, User, Comment } = require('../../models')

// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      // Include User and Comment models in the query result
      include: [
        { model: User, attributes: { exclude: 'password' } }, // Exclude password attribute from User model
        { model: Comment },
      ],
      // Order posts by date_created in descending order
      order: [['date_created', 'DESC']],
      // Limit the result to the 10 most recent posts
      limit: 10
    })
    res.json(posts)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// GET a specific post by id
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      // Include User and Comment models in the query result
      include: [
        { model: User, attributes: { exclude: 'password' } }, // Exclude password attribute from User model
        {
          model: Comment,
          // Include User model in the query result for each comment
          include: { model: User, attributes: { exclude: 'password' } }
        },
      ],
      // Order comments by date_created in descending order
      order: [[Comment, 'date_created', 'DESC']],
    })

    // If the post does not exist, return a 404 error
    if (!post) {
      res.status(404).json({ message: 'Post not found' })
      return
    }

    res.json(post)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// CREATE a new post
router.post('/', async (req, res) => {
  try {
    const result = await Post.create({
      // Set the title, content, and user_id of the new post to the values in the request body
      title: req.body.title,
      content: req.body.content,
      user_id: req.body.user_id
    })
    res.json(result)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// UPDATE a post by id
router.put('/:id', async (req, res) => {
  try {
    const result = await Post.update({
      // Set the title and content of the post to the values in the request body
      title: req.body.title,
      content: req.body.content
    },
    // Find the post with the specified id and update its attributes
    { where: { id: req.params.id } })
    res.json(result)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// DELETE a post by id
router.delete('/:id', async (req, res) => {
  try {
    const result = await Post.destroy(
      // Find the post with the specified id and delete it
      { where: { id: req.params.id } })
    res.json(result)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

module.exports = router
