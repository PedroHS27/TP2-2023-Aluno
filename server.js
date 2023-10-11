//index.js
const express = require('express')
const app = express()
const PORT = 3000
const mongoose = require('mongoose')
const dotenv = require('dotenv')
    
const userModel = mongoose.model('contas', new Schema({
   email: String,
   password: String
}))

if(process.env.NODE_ENV === 'DEV'){
    dotenv.config({path: './config/.env.dev'})
}

if(process.env.NODE_ENV === 'PROD'){
    dotenv.config({path: './config/.env.prod'})
}

mongoose.connect(process.env.URL)
 .then(()=>{

   
app.use(express.json())


app.get(`/api/:email`, async (req,res)=>{
  const email = req.params.email 
  const usuarioExiste = await userModel.findOne({email})
  res.json(usuarioExiste)
})

app.post('/api', async (req,res)=>{
   const conta = req.body
   const contaCriada = await userModel.create(conta)
   res.json(contaCriada)
})

app.delete('/api',async(req,res)=>{ 
   const conta = req.body
   const contaDeletada = await userModel.deleteOne(conta)
   res.json(contaDeletada)
})

app.put('/api', async (req,res)=>{
   const dados = req.body
   const usuarioAtualizado = await userModel.findOneAndUpdate(
      {email: dados.email, password: dados.password},
      {email: dados.newEmail, password: dados.newPassword},
      {returnDocument: 'after'}) 
      res.json(usuarioAtualizado)
})


app.use((req, res, next) => {
   res.send({erro: true, msg: "Rota não definida no servidor."})
});

app.listen(PORT, ()=>console.log(`servidor rodando na porta ${PORT}`))

 })
