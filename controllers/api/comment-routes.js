const router = require('express').Router()
const { Post, User, Comment } = require('../../models')

// GET all comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.findAll({ 
      // Include User and Post models in the query result
      include: [
        { model: User, attributes: { exclude: 'password' } }, // Exclude password attribute from User model
        { model: Post },
      ],
      // Order comments by date_created in descending order
      order: [['date_created', 'DESC']],
      // Limit the result to the 20 most recent comments
      limit: 20
    })
    res.json(comments)
  } catch (err) {
    console.log(err)
    res.json(err)
  }
})

// GET a specific comment by id
router.get('/:id', async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id, {
      // Include User and Post models in the query result
      include: [
        { model: User, attributes: { exclude: 'password' } }, // Exclude password attribute from User model
        { model: Post },
      ],
    })
    
    // If the comment does not exist, return a 404 error
    if (!comment) {
      res.status(404).json({ message: 'Comment not found' })
      return
    }

    res.json(comment)
  } catch (err) {
    console.log(err)
    res.json(err)
  }
})

// CREATE a new comment
router.post('/', async (req, res) => {
  try {
    const result = await Comment.create({
      // Set the content, user_id, and post_id of the new comment to the values in the request body
      content: req.body.content,
      user_id: req.body.user_id,
      post_id: req.body.post_id
    })
    res.json(result)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// UPDATE a comment by id
router.put('/:id', async (req, res) => {
  try {
    const result = await Comment.update({
      // Set the content of the comment to the value in the request body
      content: req.body.content
    },
    // Find the comment with the specified id and update its attributes
    { where: { id: req.params.id } })
    res.json(result)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// DELETE a comment by id
router.delete('/:id', async (req, res) => {
  try {
    const result = await Comment.destroy(
      // Find the comment with the specified id and delete it
      { where: { id: req.params.id } })
    res.json(result)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

module.exports = router
