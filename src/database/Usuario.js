const Sequelize = require('sequelize')
const connection = require('./database')


const Usuario = connection.define('userInfo', {
    nome: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    contaId:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    saldo: {
        type: Sequelize.STRING
    }
})

Usuario.sync({ force: false })

module.exports = Usuario;