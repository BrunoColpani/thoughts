const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('sys', 'root', 'giraBGG12', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('conectamos ao banco de dados');
} catch (error) {
    console.log(`Não conectou ao banco de dados: ${error}`);
}

module.exports = sequelize;