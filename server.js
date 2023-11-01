//index.js
const express = require('express')
const app = express()
const PORT = 3000
const mongoose = require('mongoose')
const dotenv = require('dotenv')
    
const userModel = mongoose.model('contas', new mongoose.Schema({
   email: String,
   password: String
}))

if(process.env.NODE_ENV === 'DEV'){
    dotenv.config({path: './config/.env.dev'})
}

if(process.env.NODE_ENV === 'PROD'){
    dotenv.config({path: './config/.env.prod'})
}

mongoose.connect('mongodb://localhost:27017/database')
 .then(()=>{

   
app.use(express.json())


app.post(`/get`, async (req,res)=>{
  const usuarioExiste = await userModel.findOne({email: req.body.email, password: req.body.password})
  if(usuarioExiste === null) {
    return res.send('conta não existe')
  }
  res.json(usuarioExiste)
})

app.post('/create', async (req,res)=>{
   const conta = req.body
   const contaCriada = await userModel.create(conta)
   res.json(contaCriada)
})

app.delete('/delete',async(req,res)=>{ 
   const conta = req.body
   const contaDeletada = await userModel.deleteOne(conta)
   res.json(contaDeletada)
})

app.put('/update', async (req,res)=>{
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
