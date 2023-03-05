const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Comment extends Model {}

// Initialize the Comment model with its attributes and options
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      validate: {
        len: [1, 1000]
      }
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      get() {
        return this.getDataValue('date_created').toLocaleDateString()
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'posts',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false, // Disable timestamp fields
    underscored: true, // Use underscored naming convention for attributes
    modelName: 'comment' // Set the model name to 'comment'
  }
)

module.exports = Comment // Export the Comment model
