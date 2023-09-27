import * as Yup from 'yup'
const connection = require('../database/database')
const CreateUser = require('../database/CreateUser')

//database

connection.authenticate().then(() => {
    console.log("conexão feita com sucesso")
}).catch((msgErr) => {
    console.log(msgErr)
})





class CreateAccount {
    async store(req, res) {

        

        const schema = Yup.object().shape({
            firstName: Yup.string().required(),
            lastName: Yup.string().required(),
            cpf: Yup.string().required(),
            cnpj: Yup.string().notRequired(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(8),
        })


        try {
            await schema.isValid(req.body, { abortEarly: true })
        } catch (err) {
            
            return res.status(400).json({ error: err.errors })
        }


        const { nome, sobrenome, cpf, cnpj, email, senha } = req.body



        const userExist = await CreateUser.findOne({
            where: { email },
            where: {cpf},
        })

        if (userExist) {
            return res.status(409).json({error: "Esse usuario já existe"})
        }



        CreateUser.create({
            nome:nome,
            sobrenome:sobrenome,
            cpf: cpf,
            cnpj: cnpj,
            email: email,
            senha:senha
            
       })

   


        return res.status(201).json({message: " Sua conta foi criada com sucesso"})


    }
}

export default new CreateAccount()