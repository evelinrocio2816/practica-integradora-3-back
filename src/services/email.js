const nodemailer= require("nodemailer")

const transporter = nodemailer.createTransport({
    service: "gmail",
    port:587,
    auth:{
        user:"evelinr2816@gmail.com",
        pass:"qfeu dsxg ggre xsoh"
    }
    
})

async function purchaseEmail(email, first_name, ticket){
    try {
        const mailOptions={
            from: "<Evelinr2816@gmail.com>",
            to: email,
            subject: "Confirmacion de compra",
            html:`<h1>Confirmacion de compra</h1>
            <p>Gracias por tu compra , ${first_name}</p>
            <p>Tu numero de ticket : ${ticket}</p>`
        };
        await transporter.sendMail(mailOptions)
    } catch (error) {
       console.log("error al enviar correo electronico"); 
    }
}

module.exports = {purchaseEmail}