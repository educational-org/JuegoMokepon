//secciones
const seccionSele_mascota= document.getElementById('seleccionar-mascota');
const seccionSeleAtaque = document.getElementById('seleccionar-ataque');
const contenedor_ataques = document.getElementById('contenedor_ataques');
const seccion_reiniciar= document.getElementById('seccion_reiniciar');
const spanEnemigo = document.getElementById("mokeponEnemigo");
const parrafoVidasJugador = document.getElementById("vidasJugador");
const parrafoVidasEnemigo = document.getElementById("vidasEnemigo");
const tituloMensaje=document.getElementById("mensaje_resultado");
const parrafoMensaje=document.getElementById("mensaje_resultado_ataque");
const ataquesJugadorDiv=document.getElementById("ataquesJugador");
const ataquesEnemigoDiv=document.getElementById("ataquesEnemigo");
const contenedor_tarjetas = document.getElementById('contenedor_tarjetas');
//botones
const btnMokepon = document.getElementById("btn_mokepon");
const btnReiniciar= document.getElementById("btn_reinciar");
const mokeponJugador= document.getElementById("nombreMokepon");

let jugadorId = null
let enemigoId = null
let mokepones = [];
let mokeponesEnemigos=[]
let mokepon;
let mokeponElegido;
let ataquesJugador=[];
let ataquesDisponiblesEnemigo;
let ataquesEnemigo = [];
let opcionDeMokepones;
let opcionDeAtaques;
let fotoAtaques=['./assets/agua.png','./assets/fuego.png','./assets/tierra.png'];
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let btnFuego;
let btnAgua;
let btnTierra;
let botonesAtaque=[];
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let victoriasJugador =0;
let victoriasEnemigo =0;

//variables de canvas
const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')
const anchoMaxMap = 800;
let alturaBuscada;
let anchoMapa = window.innerWidth -20
let lienzo = mapa.getContext('2d');
let intervalo
let mapaBackground = new Image()
mapaBackground.src="./assets/mokemap.png";


if(anchoMapa > anchoMaxMap){
    anchoMapa = anchoMaxMap - 20;
}
alturaBuscada = anchoMapa * 600 /800;
mapa.width = anchoMapa;
mapa.height= alturaBuscada;

class Mokepon{
    constructor(nombre, foto, vida, mapaFoto, id=null){
        this.id = id;
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
        this.ancho=60;
        this.alto=60;
        this.x = aleatorio(0,mapa.width - this.ancho);
        this.y =aleatorio(0,mapa.height - this.ancho);
        this.mapaFoto = new Image();
        this.mapaFoto.src =mapaFoto;
        this.velocidadX=0
        this.velocidadY=0
    }
    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}
let hipodoge = new Mokepon("Hipodoge","./assets/mokepons_mokepon_hipodoge_attack.png",3, './assets/hipodoge.png')
let capipepo = new Mokepon("Capipepo","./assets/mokepons_mokepon_capipepo_attack.png",3,'./assets/capipepo.png')
let ratigueya = new Mokepon("Ratigueya","./assets/mokepons_mokepon_ratigueya_attack.png",3,'./assets/ratigueya.png')

const HIPODOGE_ATAQUES = [
    {   id:'btn_agua', nombre:"💦 Agua", foto:fotoAtaques[0]},
    {   id:'btn_agua', nombre:"💦 Agua", foto:fotoAtaques[0]},
    {   id:'btn_agua', nombre:"💦 Agua", foto:fotoAtaques[0]},
    {   id:'btn_fuego', nombre:"🔥 Fuego", foto:fotoAtaques[1]},
    {   id:'btn_tierra', nombre:"🌱 Tierra", foto:fotoAtaques[2]}
]
const RATIGUEYA_ATAQUES = [
    {   id:'btn_fuego', nombre:'🔥 Fuego', foto:fotoAtaques[1]},
    {   id:'btn_fuego', nombre:'🔥 Fuego', foto:fotoAtaques[1]},
    {   id:'btn_fuego', nombre:'🔥 Fuego', foto:fotoAtaques[1]},
    {   id:'btn_agua', nombre:'💦 Agua', foto:fotoAtaques[0]},
    {   id:'btn_tierra', nombre:'🌱 Tierra', foto:fotoAtaques[2]}
]
const CAPIPEPO_ATAQUES = [
    {   id:'btn_tierra', nombre:'🌱 Tierra', foto:fotoAtaques[2]},
    {   id:'btn_tierra', nombre:'🌱 Tierra', foto:fotoAtaques[2]},
    {   id:'btn_tierra', nombre:'🌱 Tierra', foto:fotoAtaques[2]},
    {   id:'btn_agua', nombre:'💦 Agua', foto:fotoAtaques[0]},
    {   id:'btn_fuego', nombre:'🔥 Fuego', foto:fotoAtaques[1]}
]
//declaracion de instancias
// ... TRES PUNTOS ANTES DE ARRAY, INSERTA CONTENIDO DE ARRAY MÁS NO ARRAY MISMO
hipodoge.ataques.push(...HIPODOGE_ATAQUES);
capipepo.ataques.push(...CAPIPEPO_ATAQUES);
ratigueya.ataques.push(...RATIGUEYA_ATAQUES);
mokepones.push(hipodoge,capipepo,ratigueya);

function inciarJuego(){

    mokepones.forEach((mokepon)=>{
        opcionDeMokepones =`
        <div>
            <input class="radio_inputs" type="radio" name="mokepons" id="${mokepon.nombre}">
            <label class="cards" for="${mokepon.nombre}">
                <p>${mokepon.nombre}</p>
                <img src="${mokepon.foto}" alt="${mokepon.nombre}">
            </label>
        </div>
        `
        contenedor_tarjetas.innerHTML += opcionDeMokepones;      
    });
   
    inputHipodoge= document.getElementById("Hipodoge");
    inputCapipepo= document.getElementById("Capipepo");
    inputRatigueya= document.getElementById("Ratigueya");

    seccionSeleAtaque.style.display ='none';
    seccion_reiniciar.style.display ='none';
    btnMokepon.addEventListener('click',seleccionarMokepon);

    btnReiniciar.addEventListener('click',reiniciarJuego);
    //para canvas
    sectionVerMapa.style.display="none";

    unirseAlJuego();
}
function seleccionarMokepon(){
    if(inputHipodoge.checked){
        mokepon = inputHipodoge.id;
        mokeponJugador.innerHTML =mokepon;
        extraerAtaques(mokepon)
    }
    else if(inputCapipepo.checked){
        mokepon = inputCapipepo.id;
        mokeponJugador.innerHTML =mokepon;
        extraerAtaques(mokepon)
    }
    else if(inputRatigueya.checked){
        mokepon = inputRatigueya.id;
        mokeponJugador.innerHTML =mokepon;
        extraerAtaques(mokepon)
    }else{
        alert("Oye tienes que seleccionar un Mokepon");
    }
    if(inputHipodoge.checked || inputCapipepo.checked || inputRatigueya.checked){
        seccionSele_mascota.style.display ='none';
        sectionVerMapa.style.display="flex";
        enviarMokeponPost(mokepon)
        iniciarMapa()
    }
}
function extraerAtaques(nombre_mokepon){
    let ataques;
    
    mokepones.forEach((mokepon)=>{
        if(nombre_mokepon== mokepon.nombre){
            mokeponElegido = mokepon;
            ataques = mokepon.ataques;
        }
    })
    ataques.forEach((ataque)=>{
        opcionDeAtaques=`
        <div>
            <button class="botonAtaque" id="${ataque.id}"><img src="${ataque.foto}" alt="${ataque.id}"></button>
        </div>
        `
           contenedor_ataques.innerHTML += opcionDeAtaques;
    });
    btnFuego = document.getElementById("btn_fuego");
    btnAgua = document.getElementById("btn_agua");
    btnTierra = document.getElementById("btn_tierra");
    botonesAtaque = document.querySelectorAll('.botonAtaque');
}
function secuenciaAtaque(){
    botonesAtaque.forEach((boton)=>{

        boton.addEventListener('click',(e)=>{
            if(e.target.id == "btn_fuego"){
                ataquesJugador.push("🔥 Fuego");
                boton.style.display = 'none';
                boton.disabled = true;
            }else if(e.target.id == "btn_agua" ){
                ataquesJugador.push("💦 Agua");
                boton.style.display = 'none';
                boton.disabled = true;
            }else{
                ataquesJugador.push("🌱 Tierra");
                boton.style.display = 'none';
                boton.disabled = true;
            }
            if(ataquesJugador.length === 5){
                enviarAtaques()
            }
        });
    })

}
function seleccionOponente(enemigo){
    spanEnemigo.innerHTML = enemigo.nombre;
    ataquesDisponiblesEnemigo = enemigo.ataques;
    secuenciaAtaque()
}
//Depricated
function enemigoAtaque(){
    let ataqueAleatorio = aleatorio(0,ataquesDisponiblesEnemigo.length -1);
    if(ataqueAleatorio == 0 || ataqueAleatorio == 1){
         ataquesEnemigo.push("🔥 Fuego");
    }else if(ataqueAleatorio == 2 || ataqueAleatorio == 3){
         ataquesEnemigo.push("💦 Agua");
    }else{
         ataquesEnemigo.push("🌱 Tierra");
    }
    iniciarPelea()
}
function iniciarPelea(){
    if(ataquesJugador.length ===5){
        combate();
    }
}
function indexAmbosOponentes(jugador,enemigo){
    indexAtaqueJugador = ataquesJugador[jugador]
    indexAtaqueEnemigo = ataquesEnemigo[enemigo]
}
function combate(){
    clearInterval(intervalo)
    for(let i = 0;i<ataquesJugador.length;i++){
        if(ataquesJugador[i] == ataquesEnemigo[i]){
            indexAmbosOponentes(i,i)
            resultados = "EMPATE";
            crearMensajeAtaques(resultados)
        }else if(ataquesEnemigo[i] == "🌱 Tierra" && ataquesJugador[i] == "🔥 Fuego"){
            indexAmbosOponentes(i,i)
            resultados = "GANASTE"
            victoriasJugador++;
            parrafoVidasJugador.innerHTML=victoriasJugador;
            crearMensajeAtaques(resultados)
        }else if(ataquesEnemigo[i] == "💦 Agua" && ataquesJugador[i] == "🌱 Tierra"){
            indexAmbosOponentes(i,i)
            resultados = "GANASTE"
            victoriasJugador++;
            parrafoVidasJugador.innerHTML=victoriasJugador;
            crearMensajeAtaques(resultados)
        }else if(ataquesEnemigo[i] == "🔥 Fuego" && ataquesJugador[i] == "💦 Agua"){
            indexAmbosOponentes(i,i)
            resultados = "GANASTE"
            victoriasJugador++;
            parrafoVidasJugador.innerHTML=victoriasJugador;
            crearMensajeAtaques(resultados)
        }else{
            indexAmbosOponentes(i,i)
            resultados = "PERDISTE"
            victoriasEnemigo++;
            parrafoVidasEnemigo.innerHTML=victoriasEnemigo;
            crearMensajeAtaques(resultados)
        }
    }
    revisarVidas();
}
function revisarVidas(){
    seccion_reiniciar.style.display ='block';
    if(victoriasJugador == victoriasEnemigo){
        mensajeGanador("EMPATASTE")
    }else if(victoriasJugador>victoriasEnemigo){
        mensajeGanador("GANASTE") 
    }else if(victoriasJugador<victoriasEnemigo){
        mensajeGanador("PERDISTE")
    }
}
function crearMensajeAtaques(a){
    let parrafoJugador = document.createElement('p');
    let parrafoEnemigo = document.createElement('p');
    if(a == "GANASTE"){
        parrafoJugador.innerHTML= indexAtaqueJugador + "✔️";
        parrafoEnemigo.innerHTML= indexAtaqueEnemigo + "❌";
    }else if(a == "EMPATE"){
        parrafoJugador.innerHTML= indexAtaqueJugador + "➖";;
        parrafoEnemigo.innerHTML= indexAtaqueEnemigo + "➖";;
    }else{
        parrafoJugador.innerHTML= indexAtaqueJugador + "❌";
        parrafoEnemigo.innerHTML= indexAtaqueEnemigo + "✔️";
    }

    ataquesJugadorDiv.appendChild(parrafoJugador);
    ataquesEnemigoDiv.appendChild(parrafoEnemigo);
}
function mensajeGanador(resultadoFinal){
    let h2=document.getElementById('h2_ataques');
    h2.style.display="none";
    tituloMensaje.innerHTML = resultadoFinal + " LA BATALLA";
}
function reiniciarJuego(){
    location.reload();
}
function aleatorio(min,max){
    return Math.floor( Math.random()*( max - min +1) + min);
}
//PARA CANVAS
function iniciarMapa(){
    intervalo = setInterval(pintarCanvas,50,mokeponElegido)
    window.addEventListener('keydown',(event)=>{
        startMove(event,mokeponElegido)
    })
    window.addEventListener('keyup',()=>{
        detenerMovimiento(mokeponElegido)
    })
}
function pintarCanvas(moke){
    moke.x =  moke.x + moke.velocidadX
    moke.y =  moke.y + moke.velocidadY
    lienzo.clearRect(0,0,mapa.width,mapa.height);
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mokeponElegido.pintarMokepon()
    //enviar al servidor posicion
    enviarPosicion(moke.x,moke.y)

    mokeponesEnemigos.forEach((enemigo)=>{
        if(enemigo!==undefined){
            enemigo.pintarMokepon()
            /// REVISA COALICIÓN 
            revisarColision(enemigo)
        }

    })
   
}
function moverDerecha() {
    mokeponElegido.velocidadX =5
}
function moverIzquierda() {
    mokeponElegido.velocidadX = -5
}
function moverAbajo() {
    mokeponElegido.velocidadY = 5
}
function moverArriba() {
    mokeponElegido.velocidadY = -5
}
function detenerMovimiento() {
    mokeponElegido.velocidadX = 0
    mokeponElegido.velocidadY = 0
}
function startMove(event,moke){
    switch(event.key){
        case "ArrowRight":
            moke.velocidadX = 15
            break;
        case "ArrowUp":
            moke.velocidadY = -15
            break;
        case "ArrowLeft":
            moke.velocidadX = -15
            break;
        case "ArrowDown":
            moke.velocidadY = 15
            break;
        default:
            break;
    }
}
function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMokepon = mokeponElegido.y
    const abajoMokepon = mokeponElegido.y + mokeponElegido.alto
    const derechaMokepon = mokeponElegido.x + mokeponElegido.ancho
    const izquierdaMokepon = mokeponElegido.x
    
    if(abajoMokepon < arribaEnemigo || arribaMokepon > abajoEnemigo || derechaMokepon < izquierdaEnemigo || izquierdaMokepon > derechaEnemigo){
        return;
    }else{
        seccionSeleAtaque.style.display ='flex';
        sectionVerMapa.style.display ='none';
        clearInterval(intervalo)
        seleccionOponente(enemigo);
        detenerMovimiento(mokeponElegido)
        enemigoId = enemigo.id
    }
}

//SERVER FUNCTIONS
function unirseAlJuego(){
    //petición asincrona
    fetch('http://192.168.0.10:8080/unirse').then(function(res){
        if(res.ok){
            res.text().then(function(respuesta){
                jugadorId = respuesta
                console.log("Este es: "+jugadorId)
            });
        }
    })
}
function enviarMokeponPost(mokeponJugador){
    fetch(`http://192.168.0.10:8080/mokepon/${jugadorId}`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            mokepon:mokeponJugador
        })
    })
}
function enviarPosicion(x,y){
    fetch(`http://192.168.0.10:8080/mokepon/${jugadorId}/posicion`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            x,  
            y
        })
    }).then(function(res){
        if(res.ok){
            res.json().then(function({enemigos}){
            mokeponesEnemigos=enemigos.map((enemigo)=>{
                    if(enemigo.mokepon !== undefined){
                        let mokeEnemigo =null;
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        console.log(enemigo.mokepon.nombre)
                        if(mokeponNombre === 'Hipodoge'){
                            mokeEnemigo = new Mokepon("Hipodoge","./assets/mokepons_mokepon_hipodoge_attack.png",3, './assets/hipodoge.png',enemigo.id)
                        }else if(mokeponNombre === 'Capipepo'){
                            mokeEnemigo = new Mokepon("Capipepo","./assets/mokepons_mokepon_capipepo_attack.png",3,'./assets/capipepo.png',enemigo.id)
                        }else if(mokeponNombre === 'Ratigueya'){
                            mokeEnemigo = new Mokepon("Ratigueya","./assets/mokepons_mokepon_ratigueya_attack.png",3,'./assets/ratigueya.png',enemigo.id)
                        }
                        mokeEnemigo.x = enemigo.x
                        mokeEnemigo.y = enemigo.y
                        return mokeEnemigo
                    }
                })
            })
        }
    })
}
function enviarAtaques(){
    fetch(`http://192.168.0.10:8080/mokepon/${jugadorId}/ataques`,{
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify({
            ataques:ataquesJugador
        })
    })
    intervalo = setInterval(obtenerAtaquesEnemigo,50)
}
function obtenerAtaquesEnemigo(){
    fetch(`http://192.168.0.10:8080/mokepon/${enemigoId}/ataques`).then((res)=>{
        if(res.ok){
            res.json().then(function({ataques}){
                if(ataques.length === 5){
                    ataquesEnemigo = ataques
                    combate()
                }
            })
        }
    })
}
window.addEventListener('load',inciarJuego)

