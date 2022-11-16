const express = require('express')
const cors = require('cors')
const { read } = require('fs')
const app = express()
const jugadores = []

class Jugador{
    constructor(id){
        this.id = id
    }

    asignarMokepon(mokepon){
        this.mokepon = mokepon
    }
    actualizarPosicion(x,y){
        this.x = x
        this.y = y
    }
    actualizarAtaques(ataquesArray){
        this.ataques= ataquesArray
    }
}
class Mokepon{
    constructor(nombre){
        this.nombre = nombre
    }
}
app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.get('/unirse',(req, res)=>{
    const id = `${Math.random()}`
    const jugador = new Jugador(id)
    jugadores.push(jugador)
    res.setHeader('Access-Control-Allow-Origin','*')
    res.send(id)
})
app.post('/mokepon/:jugadorId',(req,res)=>{
    const jugadorId =req.params.jugadorId || ""
    const nombre = req.body.mokepon || ""
    const mokepon = new Mokepon(nombre)
    const jugadorIndex = jugadores.findIndex((jugador)=> jugadorId === jugador.id)
    if(jugadorIndex >= 0){
        jugadores[jugadorIndex].asignarMokepon(mokepon);
    }
    res.end()
})
app.post('/mokepon/:jugadorId/posicion',(require,res)=>{
    const jugadorId =require.params.jugadorId || ""
    const x =require.body.x || 0
    const y =require.body.y || 0
    const jugadorIndex = jugadores.findIndex((jugador)=> jugadorId === jugador.id)
    if(jugadorIndex >= 0){
        jugadores[jugadorIndex].actualizarPosicion(x,y);
    }

    const enemigos = jugadores.filter((jugador)=> jugadorId !== jugador.id)

    res.send({enemigos})
})

app.post('/mokepon/:jugadorId/ataques',(req,res)=>{
    const jugadorId = req.params.jugadorId || ""
    const ataquesArray = req.body.ataques || []
    const jugadorIndex = jugadores.findIndex((jugador)=> jugadorId === jugador.id)
    if(jugadorIndex>=0){
        jugadores[jugadorIndex].actualizarAtaques(ataquesArray)
    }
    res.end()
})

app.get('/mokepon/:jugadorId/ataques',(req,res)=>{
    const jugadorId = req.params.jugadorId || ""
    const jugador = jugadores.find((jugador)=> jugador.id == jugadorId)
    res.send({
        ataques:jugador.ataques || []
    })
})

app.post('/mokepon/:jugadorId/eliminarEnemigo',(req,res)=>{
    const jugadorId = req.params.jugadorId || ""
    const jugadorIndex = jugadores.findIndex((jugador)=> jugadorId === jugador.id)
    if(jugadorIndex>=0){
        jugadores.splice(jugadorIndex,1);
    }
    res.send({
        res:jugadores
    })
})


app.listen(8080,()=>{
    console.log("----Server is running----")
})