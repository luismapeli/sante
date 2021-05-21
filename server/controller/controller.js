var Userdb = require('../model/model');

// criando e salvando 
exports.create = (req,res)=>{
    // valiadando req
    if(!req.body){
        res.status(400).send({ message : "Conteudo nao pode ser vazio!"});
        return;
    }

    // novo usuario
    const user = new Userdb({
        nome:req.body.nome,
        idade:req.body.idade,
        altura:req.body.altura,
        peso:req.body.peso,
        sexo:req.body.sexo,
        sintomas:req.body.sintomas,
        teste:req.body.teste,
        cronico:req.body.cronico,
        risco:req.body.risco,
        mental:req.body.mental,
        // imc:req.body.imc,
        // imc: Math.round((req.body.peso/(req.body.altura*req.body.altura))*100)
        imc: parseFloat((req.body.peso/(req.body.altura*req.body.altura))*100).toFixed(2)
    })
    const teste = req.body.teste
    const risco = req.body.risco
    const sintomas = req.body.sintomas
    const cronico = req.body.cronico
    console.log(teste);
    console.log(risco);
    console.log(sintomas);
    console.log(cronico);
    const resultado = 'Teste Positivo'
    const resultadorisco = 'Sim'
    const resultadosintomas = 'Ativos'
    const resultadocronico = 'Sim'
    // Salvando Usuario no banco
    user
        .save(user)
        .then(data => {
            // res.send(data);
            if(teste.toLowerCase() == resultado.toLowerCase() //resultado postivo
            || cronico.toLowerCase() == resultadocronico.toLowerCase() && risco.toLowerCase() == resultadorisco.toLowerCase() //Cronico "Sim" e Grupo de risco "Sim"
            || risco.toLowerCase() == resultadorisco.toLowerCase() && sintomas.toLowerCase() == resultadosintomas.toLowerCase() // Grupo de Risco"Sim" e Sintomas "Sim"
            || cronico.toLowerCase() == resultadocronico.toLowerCase() && sintomas.toLowerCase() == resultadosintomas.toLowerCase()) //Cronico "Sim" e Sintomas "Sim"
            {
                console.log("Testando Condiçoes")
                res.redirect('/recomendacoes/recomendacoes.html')
            }else{
            res.redirect("/bem-estar/bem-estar.html")
            } 
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Ocorreu um erro!"
            });
        });

        

}





//Retorna todos usuarios / e tambem apenas um
exports.find = (req, res) => {

    if(req.query.id){
        const id = req.query.id;
        Userdb.findById(id)
        .then (data =>{
            if (!data){
                res.status(404).send({message:"Usuario não encontrado"})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({message:"Erro ao devolver user id"})
        })

    } else{
    Userdb.find()
    .then(user => {
        res.send(user)
    })
    .catch(err => {
        res.status(500).send({menssage: err.message || "Um Erro ocorreu durante a operação!"})
    })
}
}


//Atualiza um novo usuario pelo ID
exports.update = (req, res) => {
    console.log("passou aqui");
    if(!req.body){
        
        return res
        .status(400)
        .send({message:"Dados nao podem ser gravados vazios"})
    }

    const  id=req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data=>{
            if(!data){
                res.status(400).send({message: 'Nao foi possivel atualizar o usuario. Talvez ele possa nao ter sido encontrado'})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({message: "Erro na autalização de informaçãoes do usuario "})
        })

}

//Deleta um ususario pelo ID
exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Não foi possivel deletar o usuario com o id: ${id}. Talvez o ID esteja errado.`})
            }else{
                res.send({
                    message : "Usuario Deletado com sucesso"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Não foi possivel deletar o usuario com id=" + id
            });
        });
}

