const Sequelize = require('sequelize')
const database = require('./database')

const CreateAccount = database.define('createUsers', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sobrenome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull:false,
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cnpj: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

CreateAccount.sync({ force: false }).then(() => {
    "tabela Criada"
})

module.exports = CreateAccount
  
    
//nome sobrenome, cpf, email e senha ou cnpj