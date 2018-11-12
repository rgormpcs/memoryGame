const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
var ULTIMO_NIVEL=2

swal('Instrucciones:','1. Define el número de niveles que deseas. \n 2. Sigue el orden de la secuencia de colores iluminada en pantalla, si te equivocas perderás.\n 3.El juego te avisará si pasas al siguiente nivel. \n 4.Al final se mostrará tu puntaje en pantalla.','info')
class Juego {
  constructor() {
    setTimeout(()=>{
      this.inicializar()
      this.generarSecuencia()
      this.siguienteNivel()
    },500)

  }
  inicializar() {
    btnEmpezar.classList.add('hide')//para ocultar el boton
    this.nivel=1
    this.puntaje=0;
    this.colores ={
      celeste,
      violeta,
      naranja,
      verde
    }
    this.elegirColor=this.elegirColor.bind(this)
  }
  generarSecuencia(){
    this.secuencia = new Array(10).fill(0).map(n => Math.floor(Math.random() *4))
  }
  siguienteNivel(){
    if(this.nivel===1){
      this.subNivel=0
      this.iluminarSecuencia()
      this.agregarEventosClick()
    }else{
      swal('Jugador',`Pasaste al nivel ${this.nivel}`,'success')//devuelve una promesa
      .then(()=>{
        this.subNivel=0
        this.iluminarSecuencia()
        this.agregarEventosClick()
      })
    }
  }
  transformarNumeroAColor(numero){
    switch (numero) {
      case 0:
        return 'celeste'
      case 1:
        return 'violeta'
      case 2:
        return 'naranja'
      case 3:
        return 'verde'
    }
  }
  transformarColorANumero(nombreColor){
    switch (nombreColor) {
      case 'celeste':
        return 0
      case 'violeta':
        return 1
      case 'naranja':
        return 2
      case 'verde':
        return 3
    }
  }
  iluminarSecuencia(){
    for (let i=0;i<this.nivel;i++){
      const color = this.transformarNumeroAColor(this.secuencia[i])
      setTimeout(()=> this.iluminarColor(color),1000 *i)
    }
  }
  iluminarColor(color){
    this.colores[color].classList.add('light')
    setTimeout(()=>this.apagarColor(color),350)
  }
  apagarColor(color){
    this.colores[color].classList.remove('light')
  }
  agregarEventosClick(){
    this.colores.celeste.addEventListener('click',this.elegirColor)
    this.colores.verde.addEventListener('click',this.elegirColor)
    this.colores.violeta.addEventListener('click',this.elegirColor)
    this.colores.naranja.addEventListener('click',this.elegirColor)
  }
  eliminarEventosClick(){
    this.colores.celeste.removeEventListener('click',this.elegirColor)
    this.colores.verde.removeEventListener('click',this.elegirColor)
    this.colores.violeta.removeEventListener('click',this.elegirColor)
    this.colores.naranja.removeEventListener('click',this.elegirColor)
  }
  elegirColor(ev){
    console.log(ev)
    const nombreColor=ev.target.dataset.color
    const numeroColor=this.transformarColorANumero(nombreColor)
    this.iluminarColor(nombreColor)
    if (numeroColor === this.secuencia[this.subNivel]){
      this.subNivel++
      this.puntaje+=1
      console.log(`puntaje ${this.puntaje}`)
      if(this.subNivel === this.nivel){
        this.nivel++
        this.eliminarEventosClick()
        if(this.nivel ===(ULTIMO_NIVEL+1)){
          this.ganoElJuego()
        }else{
          setTimeout(this.siguienteNivel.bind(this),1000)//no se invoca la funcion solo se hace referencia
        }
      }
    }else{
      this.perdioElJuego()
    }
  }
  ganoElJuego(){
    swal('Jugador',`Felicitaciones,ganaste el juego!\nPuntuación: ${this.puntaje}`,'success')//devuelve una promesa
    .then(this.inicializar.bind(this))
  }
  perdioElJuego(){
    swal('Jugador',`Lo siento, Perdiste en el nivel ${this.nivel}`,'error')//devuelve una promesa
    .then(()=>{
      this.eliminarEventosClick()
      this.inicializar()
      btnEmpezar.classList.remove('hide')
    })
}}

function empezarJuego() {
  window.juego = new Juego()
  this.ULTIMO_NIVEL=parseInt(document.getElementById('nivelNumber').value)
  console.log(ULTIMO_NIVEL);
}
