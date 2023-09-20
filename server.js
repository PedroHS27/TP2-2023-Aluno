//index.js
const express = require('express')
const app = express()
const PORT = 3000
const crud = require('./crud')

app.use(express.json())


 app.get(`/api/:email`, (req,res)=>{
   const email = req.params.email 
   const getCrud = new crud()
   const usuarioExiste = getCrud.contaExiste(email)

   if (usuarioExiste) {
    const usuario = getCrud.lerDados(email)
    res.send({message: `email: ${usuario.email} password: ${usuario.password}`})
      return
   }

   res.send(`essa conta não existe`)
 })

 app.post('/api',(req,res)=>{
    const conta = req.body
    const postCrud = new crud()
    const usuarioExiste = postCrud.contaExiste(conta.email)

    if (!usuarioExiste) {
      postCrud.criaConta(conta.email, req.body)
      res.send({message: `usuario ${conta.email} cadastrado com sucesso`})
      return
    }
    res.send({message: `esta conta já existe`})
})

 app.put('/api',(req,res)=>{
    const dados = req.body
    const putCrud = new crud()
    const usuarioExiste = putCrud.contaExiste(dados.email)

    if (usuarioExiste) {
        putCrud.atualizaConta(dados.email, dados)
        res.send({message: `usuario ${dados.email} atualizado com sucesso`}) 
        return
    }
    res.send({message: `essa conta não existe`})
 })

 app.delete('/api',(req,res)=>{ 
    const email = req.body.email
    const deleteCrud = new crud()
    const usuarioExiste = deleteCrud.contaExiste(email)


    if (usuarioExiste) {      
    deleteCrud.apagarConta(email)
    res.send({message: `usuario ${email} deletado com sucesso`})
    return
    }
    res.send({message: `essa conta não existe`})
    
 })


 app.listen(PORT, ()=>console.log(`servidor rodando na porta ${PORT}`))