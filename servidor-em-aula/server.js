const filmesJson = require("./data/ghibli.json")

const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json()) //faz o parseamento do body(body parser)


app.get("/", (request, response)=>{
    response.status(200).json([
        {
            "mensagem": "API de filmes Ghibli on15"
        }
    ])
})


app.get("/filmes", (request, response)=>{
    response.status(200).send(filmesJson)
})


app.get("/filmes/buscar/:id", (request, response)=>{
    //recuperando o valor de ID enviado na request
    let idRequest = request.params.id
                        //ARRAY.find(elemento => comparaçao)
                        //encontre um filme dentro do filmes Json
                        //que o id do filme seja igual o id do request
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

    response.status(200).send(filmeEncontrado)

    console.log(idRequest)
})
//query params
app.get("/filmes/filtro", (request, response)=>{
    let tituloRequest = request.query.titulo.toLowerCase()
    console.log(tituloRequest)

    let filmeEncontrado = filmesJson.filter(
        filme => filme.title.toLowerCase().includes(tituloRequest))

    response.status(200).send(filmeEncontrado)
})




app.post("/filmes/cadastrar", (request, response)=>{
    let bodyRequest = request.body

    let novoFilme = {
        id: (filmesJson.length)+1,
        title: bodyRequest.title,
        description: bodyRequest.description
    }
    filmesJson.push(novoFilme)

    response.setMaxListeners(201).send({
        "mensagem": "filme cadastrado com sucesso",
        novoFilme
    })
})

app.listen(3030, ()=>{
    console.log("alô, pepe moreno? to na porta 3030")
})