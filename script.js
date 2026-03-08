
let ovelhaSelecionada = null


function pegarOvelhas() {
    let ovelhas = localStorage.getItem("ovelhas")

    if(ovelhas){
        return JSON.parse(ovelhas)
    } else {
        return []
    }
}

function salvarOvelhas(lista){
    localStorage.setItem("ovelhas", JSON.stringify(lista))
}

function criarOvelha(){

let ovelhas = pegarOvelhas()

let novaOvelha = {
    id: Date.now(),
    tosada: false
}

ovelhas.push(novaOvelha)

salvarOvelhas(ovelhas)

listarOvelhas()

}

function listarOvelhas(){

let container = document.getElementById("ovelhas")

container.innerHTML = ""

let ovelhas = pegarOvelhas()

ovelhas.forEach(o => {

    let ovelha = document.createElement("a-entity")

let x = Math.random()*8-4
let z = Math.random()*8-4

ovelha.setAttribute("position",`${x} 0.5 ${z}`)

// corpo da ovelha
let corpo = document.createElement("a-sphere")
corpo.setAttribute("radius","0.5")

if(o.tosada){
corpo.setAttribute("color","#888")
}else{
corpo.setAttribute("color","white")
}

ovelha.appendChild(corpo)

// cabeça
let cabeca = document.createElement("a-sphere")
cabeca.setAttribute("radius","0.25")
cabeca.setAttribute("color","black")
cabeca.setAttribute("position","0.55 0.1 0")

ovelha.appendChild(cabeca)

// pernas
for(let i=0;i<4;i++){

let perna = document.createElement("a-cylinder")

perna.setAttribute("radius","0.05")
perna.setAttribute("height","0.5")
perna.setAttribute("color","black")

let px = (i<2)? -0.2 : 0.2
let pz = (i%2===0)? -0.2 : 0.2

perna.setAttribute("position",`${px} -0.5 ${pz}`)

ovelha.appendChild(perna)

}

ovelha.addEventListener("click",()=>{

ovelhaSelecionada = o.id

console.log("Ovelha selecionada:", o.id)

// remove círculo antigo
let antigo = document.getElementById("anelSelecao")
if(antigo){
antigo.remove()
}

// cria novo círculo
let anel = document.createElement("a-ring")

anel.setAttribute("id","anelSelecao")
anel.setAttribute("radius-inner","0.6")
anel.setAttribute("radius-outer","0.8")
anel.setAttribute("rotation","-90 0 0")
anel.setAttribute("color","yellow")

let pos = ovelha.getAttribute("position")

anel.setAttribute("position",`${pos.x} 0.01 ${pos.z}`)

document.querySelector("a-scene").appendChild(anel)

})

container.appendChild(ovelha)

})

}

function tosarOvelha(id){

let ovelhas = pegarOvelhas()

ovelhas = ovelhas.map(o => {

if(o.id === id){
o.tosada = true
}

return o

})

salvarOvelhas(ovelhas)

let anel = document.getElementById("anelSelecao")
if(anel){
anel.remove()
}

listarOvelhas()

}

function morrerOvelha(id){

let ovelhas = pegarOvelhas()

ovelhas = ovelhas.filter(o => o.id !== id)

salvarOvelhas(ovelhas)

let anel = document.getElementById("anelSelecao")
if(anel){
anel.remove()
}

listarOvelhas()

}

document.addEventListener("DOMContentLoaded", () => {

let btnCriar = document.querySelector("#btnCriarOvelha")
let btnTosar = document.querySelector("#btnTosar")
let btnAlimentar = document.querySelector("#btnAlimentar")
let btnMatar = document.querySelector("#btnMatar")
let menu = document.querySelector("#menuOvelha")
let btnListar = document.querySelector("#btnListar")
let btnLimpar = document.querySelector("#btnLimpar")

btnListar.addEventListener("click",()=>{

listarOvelhas()

})

btnLimpar.addEventListener("click",()=>{

localStorage.removeItem("ovelhas")

listarOvelhas()

})

btnCriar.addEventListener("click", () => {
criarOvelha()
})

btnTosar.addEventListener("click",()=>{

if(ovelhaSelecionada){
tosarOvelha(ovelhaSelecionada)
}

})

btnAlimentar.addEventListener("click",()=>{

if(!ovelhaSelecionada) return

let ovelhas = pegarOvelhas()

ovelhas = ovelhas.map(o=>{

if(o.id === ovelhaSelecionada){
o.tosada = false
}

return o
})

salvarOvelhas(ovelhas)

let anel = document.getElementById("anelSelecao")
if(anel){
anel.remove()
}

listarOvelhas()

})

})

btnMatar.addEventListener("click",()=>{

if(ovelhaSelecionada){
morrerOvelha(ovelhaSelecionada)
}

})


