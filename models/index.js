const User = require('./User')
const Post = require('./Post')
const Comment = require('./Comment')

// Define the associations between the User, Post, and Comment models
User.hasMany(Post, { foreignKey: 'user_id' }) // A User can have many Posts
Post.belongsTo(User, { foreignKey: 'user_id' }) // A Post belongs to a User

User.hasMany(Comment, { foreignKey: 'user_id' }) // A User can have many Comments
Comment.belongsTo(User, { foreignKey: 'user_id' }) // A Comment belongs to a User

Post.hasMany(Comment, { foreignKey: 'post_id' }) // A Post can have many Comments
Comment.belongsTo(Post, { foreignKey: 'post_id' }) // A Comment belongs to a Post

module.exports = { User, Post, Comment } // Export the User, Post, and Comment models
