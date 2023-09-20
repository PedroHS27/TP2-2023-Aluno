//crud.js
const fs = require('fs')


class crud {

    criaConta(email, dados) {
        fs.writeFile(`${__dirname}/${email}.json`, JSON.stringify(dados), (err)=>{
            if (err) throw err;
        })
    }

    lerDados(email) {
        const usuarioEncontrado = fs.readFileSync(`${__dirname}/${email}.json`)
        const usuarioemJson = JSON.parse(usuarioEncontrado)
        return usuarioemJson
    }

    apagarConta(conta) {
        fs.unlink(`${__dirname}/${conta}.json`, (err) =>{
            if (err) throw err;
        })
    }
    
    contaExiste(email) {
        return fs.existsSync(`${__dirname}/${email}.json`)
    }

    atualizaConta(email, dados) {
    fs.writeFileSync(`${__dirname}/${email}.json`, JSON.stringify(dados))
    }
}
 

module.exports = crud


