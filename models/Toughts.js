const {DataTypes} = require('sequelize')
const db = require('../db/db')

const User = require('./User')

const Tought = db.define('Toughts', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    }
})

Tought.belongsTo(User)
User.hasMany(Tought)

module.exports = Tought;