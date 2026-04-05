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

  let matriz = Array(10).fill().map(() => Array(10).fill(''));

  //colocando as palavras
  fases[faseAtual].palavras.forEach(palavra => {
    let linha = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * (10 - palavra.length));

    for (let i = 0; i < palavra.length; i++) {
      matriz[linha][col + i] = palavra[i];
    }
  });

  //preencher resto com letras aleatórias
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (matriz[i][j] === '') {
        matriz[i][j] = letras[Math.floor(Math.random() * letras.length)];
      }
    }
  }
  //renderizar
  matriz.forEach(linha => {
    linha.forEach(letra => {
      const div = document.createElement('div');
      div.classList.add('letra');
      div.textContent = letra;

      div.onclick = () => selecionar(div);

      grid.appendChild(div);
    });
  });
  mostrarPalavras();
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

  if (fases[faseAtual].palavras.includes(tentativa)) {
    selecionadas.forEach(l => {
      l.classList.remove('selecionada');
      l.classList.add('correta');
    });

    pontos += 10;
    atualizarPontos();

    palavrasEncontradas++;
    selecionadas = [];

    if (palavrasEncontradas === 5) {
      finalizarFase();
    }
  }

  if (tentativa.length > 10) {
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

//fim da fase
const fim = document.getElementById('fim');

function finalizarFase() {
  jogo.classList.add('hidden');
  fim.classList.remove('hidden');
}

//botão à próxima fase
document.getElementById('proximo').onclick = () => {
  faseAtual++;
  palavrasEncontradas = 0;

  fim.classList.add('hidden');
  jogo.classList.remove('hidden');

  criarGrid();
};

//hamburguer por enquanto
document.querySelector('.menu-icon').onclick = () => {
  if (confirm('Deseja sair?')) {
    location.reload();
  }
};