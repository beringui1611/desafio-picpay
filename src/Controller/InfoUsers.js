

const connection = require('../database/database')
const UsuarioAccount = require('../database/Infos')


//database
connection.authenticate().then(() => {
    console.log("conexão feita com sucesso")
}).catch((msgErr) => {
    console.log(msgErr)
})


class UserAccount{
    async store(req, res) {


        const {nome, contaId, saldo} = req.body

        const userExist = await UsuarioAccount.findOne({
      where: {contaId: contaId}
        })
        
        if (userExist) {
            return res.status(409).json({error: "Este usuario já existe"})
        }


        UsuarioAccount.create({
           nome: nome,
           contaId: contaId,
           saldo: saldo
        })
        
        return res.status(201).json(`Olá ${nome}, seu saldo é de ${saldo}`)
    }
}



export default new UserAccount()

