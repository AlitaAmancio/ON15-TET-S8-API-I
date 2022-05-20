const filmesJson = require("./data/filmes.json")
const seriesJson = require("./data/series.json")

const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

app.get ("/", (request, response)=>{
    response.status(200).json([
        {
            "Mensagem": "API listando filmes e séries"
        }
    ])
})

app.get("/filmes/buscar/:id", (request, response)=>{

    let idRequest = request.params.id

let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest) 

response.status(200).send(filmeEncontrado)
})

app.get("/filmes", (request, response)=> {
    response.status(200).send(filmesJson)
})

app.get("/series", (request, response)=> {
    response.status(200).send(seriesJson)
})

app.get("/series/buscar/:id", (request, response)=>{

    let idRequest = request.params.id

let serieEncontrada = seriesJson.find(serie => serie.id == idRequest) 

response.status(200).send(serieEncontrada)
})

app.get("/filmes/filtro", (request, response)=>{
    let titleRequest = request.query.title.toLowerCase()

    let titleEncontrado = filmesJson.filter(
        filme => filme.Title.toLowerCase().includes(titleRequest))

    response.status(200).send(titleEncontrado)
})

app.get("/series/filtro", (request, response)=>{
    let titleRequest = request.query.title.toLowerCase()

    let titleEncontrado = seriesJson.filter(
        serie => serie.title.toLowerCase().includes(titleRequest))

    response.status(200).send(titleEncontrado)
})



app.listen (5050, ()=>{
    console.log("Servidor em funcionamento na porta 5050!")
})
  
  