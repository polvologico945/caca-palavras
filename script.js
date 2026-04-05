let nomeJogador = '';
let pontos = 0;

const menu = document.getElementById('menu');
const jogo = document.getElementById('jogo');

document.getElementById('btnJogar').onclick = () => {
  nomeJogador = document.getElementById('nome').value;

  if (!nomeJogador) {
    alert('Digite seu nome!');
    return;
  }

  menu.classList.add('hidden');
  jogo.classList.remove('hidden');

  iniciarJogo();
};

function iniciarJogo() {
  criarGrid();
}

const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function criarGrid() {
  const grid = document.getElementById('grid');
  grid.innerHTML = '';

  for (let i = 0; i < 100; i++) {
    const div = document.createElement('div');
    div.classList.add('letra');

    const letra = letras[Math.floor(Math.random() * letras.length)];
    div.textContent = letra;

    div.onclick = () => selecionar(div);

    grid.appendChild(div);
  }
}

let selecionadas = [];

function selecionar(div) {
  div.classList.add('selecionada');
  selecionadas.push(div);

  verificarPalavra();
}

//palavras mais simples

const palavras = ["COPA", "GOL", "BOLA", "FIFA", "TIME"];

function verificarPalavra() {
  const tentativa = selecionadas.map(l => l.textContent).join('');

  if (palavras.includes(tentativa)) {
    selecionadas.forEach(l => {
      l.classList.remove('selecionada');
      l.classList.add('correta');
    });

    pontos += 10;
    atualizarPontos();
    selecionadas = [];
  }

  if (tentativa.length > 8) {
    errar();
  }
}

function errar() {
  pontos = Math.max(0, pontos - 1);
  atualizarPontos();

  selecionadas.forEach(l => l.classList.remove('selecionada'));
  selecionadas = [];
}

//pontos
function atualizarPontos() {
  document.getElementById('pontos').textContent = pontos;
}

//fases (10) e seus respectivos temas
const fases = [
  { tema: "Copa", palavras: ["GOL", "BOLA", "TIME", "FIFA", "COPA"] },
  { tema: "Música", palavras: ["SOM", "NOTA", "RITMO", "BANDA", "CANTO"] },
  { tema: "Filmes", palavras: ["ATOR", "CENA", "ROTEIRO", "FILME", "AÇÃO"] },
  { tema: "Frutas", palavras: ["MAÇA", "UVA", "PERA", "MANGA", "BANANA"] },
  { tema: "Países", palavras: ["BRASIL", "CHILE", "PERU", "JAPAO", "CANADA"] },
  { tema: "Estados", palavras: ["CEARA", "BAHIA", "PARA", "AMAPA", "GOIAS"] },
  { tema: "Ciência", palavras: ["ATOMO", "DNA", "CELULA", "ENERGIA", "FORCA"] },
  { tema: "Números", palavras: ["ONE", "TWO", "THREE", "FOUR", "FIVE"] },
  { tema: "Idiomas", palavras: ["PORTUGUES", "INGLES", "ESPANHOL", "FRANCES", "ITALIANO"] },
  { tema: "Aleatório", palavras: ["SOL", "LUZ", "MAR", "VENTO", "TEMPO"] }
];

let faseAtual = 0;
let palavrasEncontradas = 0;

//mostrar as palavras na tela
function mostrarPalavras() {
  const div = document.getElementById('palavras');
  div.innerHTML = '';

  fases[faseAtual].palavras.forEach(p => {
    const span = document.createElement('span');
    span.textContent = p + " ";
    div.appendChild(span);
  });
}