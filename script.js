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

    //colocar as palavras
    fases[faseAtual].palavras.forEach(palavra => {
        let colocada = false;
        let tentativas = 0;

        while (!colocada && tentativas < 100) {
            tentativas++;

            let linha = Math.floor(Math.random() * 10);
            let col = Math.floor(Math.random() * (10 - palavra.length));

            let podeColocar = true;

            for (let i = 0; i < palavra.length; i++) {
                if (matriz[linha][col + i] !== '') {
                    podeColocar = false;
                    break;
                }
            }

            if (podeColocar) {
                for (let i = 0; i < palavra.length; i++) {
                    matriz[linha][col + i] = palavra[i];
                }
                colocada = true;
            }
        }
    });

    //preencher o resto
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (matriz[i][j] === '') {
                matriz[i][j] = letras[Math.floor(Math.random() * letras.length)];
            }
        }
    }

    //renderizar
    matriz.forEach((linha, i) => {
        linha.forEach((letra, j) => {
            const div = document.createElement('div');
            div.classList.add('letra');
            div.textContent = letra;

            div.dataset.linha = i;
            div.dataset.coluna = j;

            div.onclick = () => selecionar(div);

            grid.appendChild(div);
        });
    });

    mostrarPalavras();
}

let selecionadas = [];

function selecionar(div) {
    if (div.classList.contains('selecionada')) return;

    div.classList.add('selecionada');
    selecionadas.push(div);

    verificarPalavra();
}

//verificar palavra
function verificarPalavra() {
    if (selecionadas.length < 2) return;

    const letras = selecionadas.map(l => l.textContent).join('');

    const linhas = selecionadas.map(l => parseInt(l.dataset.linha));
    const colunas = selecionadas.map(l => parseInt(l.dataset.coluna));

    //verificar se está na mesma linha
    const mesmaLinha = linhas.every(l => l === linhas[0]);

    //verificar se está na mesma coluna (caso queira no futuro)
    const mesmaColuna = colunas.every(c => c === colunas[0]);

    //ordenar seleção pela coluna (esquerda → direita)
    let ordenadas = [...selecionadas];

    if (mesmaLinha) {
        ordenadas.sort((a, b) => a.dataset.coluna - b.dataset.coluna);
    }

    const tentativa = ordenadas.map(l => l.textContent).join('');

    if (mesmaLinha && fases[faseAtual].palavras.includes(tentativa)) {

        ordenadas.forEach(l => {
            l.classList.remove('selecionada');
            l.classList.add('correta');
        });

        pontos += 10;
        atualizarPontos();

        palavrasEncontradas++;

        //marcar palavra encontrada
        document.querySelectorAll('.palavra-box').forEach(span => {
            if (span.textContent === tentativa) {
                span.classList.add('encontrada');
            }
        });

        selecionadas = [];

        if (palavrasEncontradas === 5) {
            finalizarFase();
        }
    }

    if (selecionadas.length > 10) {
        errar();
    }
}

function errar() {
    pontos = Math.max(0, pontos - 1);
    atualizarPontos();

    selecionadas.forEach(l => l.classList.remove('selecionada'));
    selecionadas = [];
}

function atualizarPontos() {
    document.getElementById('pontos').textContent = pontos;
}

//fases
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

//mostrar as palavras
function mostrarPalavras() {
    const div = document.getElementById('palavras');
    div.innerHTML = '';

    fases[faseAtual].palavras.forEach(p => {
        const span = document.createElement('span');
        span.textContent = p;
        span.classList.add('palavra-box');

        div.appendChild(span);
    });
}

//fim de fase
const fim = document.getElementById('fim');

function finalizarFase() {
    jogo.classList.add('hidden');
    fim.classList.remove('hidden');
}

//próxima fase
document.getElementById('proximo').onclick = () => {
    faseAtual++;
    palavrasEncontradas = 0;
    selecionadas = [];

    fim.classList.add('hidden');
    jogo.classList.remove('hidden');

    criarGrid();
};

//hamburguer
const menuIcon = document.querySelector('.menu-icon');
const menuDrop = document.getElementById('menuDrop');

menuIcon.onclick = () => {
    menuDrop.classList.toggle('hidden');
};

document.getElementById('btnSair').onclick = () => {
    location.reload();
};