const { DataTypes } = require('sequelize');

const sequelize = require('../db');

const Comment = sequelize.define('Comment', {

    username: {

        type: DataTypes.STRING,

        allowNull: false

    },

    text: {

        type: DataTypes.TEXT,

        allowNull: false

    }

}, {

    timestamps: false

});

module.exports = Comment;