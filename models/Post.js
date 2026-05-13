const { DataTypes } = require('sequelize');
const sequelize = require ('../db');
const Post = sequelize.define('Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }, 

    author: {
        type: DataTypes.STRING,
        allowNull: false
    }, 

    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},{
    timestamps:false
    
});
module.exports = Post;