const Sequelize = require('sequelize')
const connection = require('./database')


const UsuarioAccount = connection.define('usuarioSaldo', {
    nome: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    contaId:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    saldo: {
        type: Sequelize.FLOAT
    }
})

UsuarioAccount.sync({ force: false })

module.exports = UsuarioAccount;