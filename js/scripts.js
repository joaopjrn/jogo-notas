let listaSons = [
  {
    nome: 'Segunda Menor',
    src: './assets/sons/segundaMenor.mp3',
    resp: 0
  },
  {
    nome: 'Segunda Maior',
    src: './assets/sons/segundaMaior.mp3',
    resp: 1
  },
  {
    nome: 'Terça Menor',
    src: './assets/sons/tercaMenor.mp3',
    resp: 2
  },
  {
    nome: 'Terça Maior',
    src: './assets/sons/tercaMaior.mp3',
    resp: 3
  },
  {
    nome: 'Quarta Justa',
    src: './assets/sons/quartaJusta.mp3',
    resp: 4
  },
  {
    nome: 'Quinta Diminuta',
    src: './assets/sons/quintaDiminuta.mp3',
    resp: 5
  },
  {
    nome: 'Quinta Justa',
    src: './assets/sons/quintaJusta.mp3',
    resp: 6
  },
  {
    nome: 'Sexta Menor',
    src: './assets/sons/sextaMenor.mp3',
    resp: 7
  },
  {
    nome: 'Sexta Maior',
    src: './assets/sons/sextaMaior.mp3',
    resp: 8
  },
  {
    nome: 'Sétima Menor',
    src: './assets/sons/setimaMenor.mp3',
    resp: 9
  },
  {
    nome: 'Sétima Maior',
    src: './assets/sons/setimaMaior.mp3',
    resp: 10
  },
  {
    nome: 'Oitava Justa',
    src: './assets/sons/oitavaJusta.mp3',
    resp: 11
  },
];

const volSlider = document.getElementById('volSlider');
const listaRespostas = document.getElementById('listaRespostas');
const respImg = document.getElementById('respImg');
const btnStart = document.getElementById('btnStart');
const btnRestart = document.getElementById('btnRestart');
const btnRepetir = document.getElementById('btnRepetir');
const displayAcertos = document.getElementById('acertos');
const displayRodadas = document.getElementById('rodadas');
const barraAcertos = document.getElementById('barraAcertos');
const barraRodadas = document.getElementById('barraRodadas');
const iconeRepetir = document.getElementById('iconeRepetir');
const iconeResp = document.getElementById('iconeResp');
const barraTopo = document.getElementById('barraTopo');

// main {
  let somNota = new Audio();
  let resp;
  let ultimoSom;
  let respondendo = false;
  let comecar = false;
  somNota.volume = volSlider.value / 100;

  btnRepetir.style.opacity = '50%';
  btnRepetir.style.pointerEvents = 'none';
  iconeRepetir.style.opacity = '50%';
  iconeRepetir.style.pointerEvents = 'none';
// }

window.addEventListener('resize', (e) => {
  console.log(window.innerWidth);
});

window.addEventListener('keydown', (e) => {
  if(e.key == 'ArrowUp'){
    volSlider.value++;
    somNota.volume = volSlider.value / 100;
  }else if(e.key == 'ArrowDown'){
    volSlider.value--;
    somNota.volume = volSlider.value / 100;
  }
});

somNota.addEventListener('ended', (e) => {
  respondendo = true;
  iconeResp.src = './assets/img/spinner.gif';
  respImg.src = './assets/img/spinner.gif';
});

volSlider.addEventListener('input', (e) =>{
  somNota.volume = volSlider.value / 100;
});

btnStart.addEventListener('click', (e) => {
  if(comecar == true){
    console.log('Jogo já começou');
  }else{
    shuffleArray(listaSons);
    console.log(listaSons);
    btnStart.style.pointerEvents = 'none';
    btnStart.style.opacity = '50%';
    btnRepetir.style.opacity = '100%';
    btnRepetir.style.pointerEvents = 'auto';
    iconeRepetir.style.opacity = '100%';
    iconeRepetir.style.pointerEvents = 'auto';
    comecar = true;
    tocarSom();
  }
});

btnRestart.addEventListener('click', (e) => {
  //console.clear();
  btnStart.style.pointerEvents = 'auto';
  btnStart.style.opacity = '100%';
  comecar = false;
  somNota.pause();
  somNota.currentTime = 0;
  displayRodadas.innerHTML = 0;
  displayAcertos.innerHTML = 0;
  barraAcertos.innerHTML = 0;
  barraRodadas.innerHTML = 0;
  resp = null;
  ultimoSom = null;
  iconeResp.src = './assets/img/nota.png';
  respImg.src = './assets/img/nota.png';
  respondendo = false;
  somNota.removeAttribute('src');
  btnRepetir.style.opacity = '50%';
  btnRepetir.style.pointerEvents = 'none';
  iconeRepetir.style.opacity = '50%';
  iconeRepetir.style.pointerEvents = 'none';
});

btnRepetir.addEventListener('click', (e) => {
  repetir();
});

iconeRepetir.addEventListener('click', (e) => {
  repetir();
});

listaRespostas.addEventListener('click', (e) => {
  console.log(respondendo);
  if(respondendo == true){
    if(e.target.id == resp.resp){
      respondendo = false;
      respImg.src = './assets/img/right.png';
      iconeResp.src = './assets/img/right.png';
      resp = null;
      somarAcertos();
      somarRodadas();
      setTimeout(() => {
        iconeResp.src = './assets/img/nota.png';
        respImg.src = './assets/img/nota.png';
        tocarSom();
      }, 3000);
    }else{
      respondendo = false;
      respImg.src = './assets/img/wrong.png';
      iconeResp.src = './assets/img/wrong.png';
      somarRodadas();
      setTimeout(() => {
        iconeResp.src = './assets/img/nota.png';
        respImg.src = './assets/img/nota.png';
        tocarSom(ultimoSom);
      }, 2000);
    }
  }
});

function tocarSom(som){
  if(som != null){
    somNota.src = som.src;
    somNota.play();
  }else{
    ultimoSom = listaSons[getRandom(0,11)];
    somNota.src = ultimoSom.src;
    somNota.play();
  }
}


function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let random = Math.floor(Math.random() * (max - min + 1) + min);
  resp = listaSons[random];
  console.log(listaSons[random].nome);
  return random;
}

function shuffleArray (array){
  for(let i = array.length -1; i> 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function repetir (){
  if(somNota.src != ''){
    respondendo = false;
    iconeResp.src = './assets/img/nota.png';
    respImg.src = './assets/img/nota.png';
    somNota.currentTime = 0;
    somNota.play();
  }
}

function somarRodadas(){
  displayRodadas.innerHTML = parseInt(displayRodadas.innerHTML) + 1;
  barraRodadas.innerHTML = parseInt(barraRodadas.innerHTML) + 1;
}

function somarAcertos(){
  displayAcertos.innerHTML = parseInt(displayAcertos.innerHTML) + 1;
  barraAcertos.innerHTML = parseInt(barraAcertos.innerHTML) + 1;
}