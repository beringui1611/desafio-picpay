
const InfoUsuario = require('../database/Infos')
const CreateAccount = require('../database/CreateUser')
import nodemailer from 'nodemailer'
import security from '../security'


class Transferencia {
    async update(req, res) {

        const { enviar, receber, value } = req.body




        const userSender = await InfoUsuario.findOne({
            where: { id: enviar }
        })

        if (userSender.saldo < value) {
            return res.status(400).json({ error: "saldo insuficiente" })
        }






        const userReceiver = await InfoUsuario.findOne({
            where: { id: receber }
        })
        if (!userReceiver) {
            res.status(409).json({ error: "usuario nao encontrado" })
        }



        userSender.saldo -= value
        userReceiver.saldo += value

        await userSender.save()
        await userReceiver.save()


        const senderEmail = await CreateAccount.findOne({
            where:{id:enviar}
        })


      

   
            const transporter = nodemailer.createTransport({
                host: 'smtp.zoho.com',
                port:587,
                auth: {
                  user: 'atendimento@pixellab.dev.br',
                    pass: security
                }
              })
            
            
              const mailOptions = {
                from:'atendimento@pixellab.dev.br' ,
                to:senderEmail.email ,
                subject: 'Transferencia Realizada com Sucesso',
                text: `você realizou uma transferencia no valor de ${value} para o destinatario ${receber} `
              }
            
            
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.error(error)
                 
                } else {
                  console.log('Email sent ' + info.response)
                  return response.status(200).json({message: 'password reset email sent'})
                }
              })
        

      
  

       
     



        return res.status(200).json("transferencia realizada com sucesso")
    }
}

export default new Transferencia()