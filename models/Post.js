const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Post extends Model {}

// Define the Post model with its attributes and data types
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [1,100]
      }
    },
    content: {
      type: DataTypes.STRING(10000),
      allowNull: false,
      validate: {
        len: [1, 20000]
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
    }
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'post'
  }
)

module.exports = Post // Export the Post model