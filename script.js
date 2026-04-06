let nomeJogador = '';
let pontos = 0;
let faseAtual = 0;
let palavrasEncontradas = 0;
let selecionadas = [];

const menu = document.getElementById('menu');
const jogo = document.getElementById('jogo');
const fim = document.getElementById('fim');

const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

//carregar ranking ao abrir
carregarRanking();

//eventos
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

const rankingDiv = document.getElementById('ranking');

document.getElementById('btnTop').onclick = async () => {
    if (rankingDiv.classList.contains('hidden')) {
        await carregarRanking();
        rankingDiv.classList.remove('hidden');
    } else {
        rankingDiv.classList.add('hidden');
    }
};


document.getElementById('btnSair').onclick = async () => {
    console.log("clicou sair");

    try {
        await salvarPontuacao();
        console.log("salvou no banco");
    } catch (erro) {
        console.log("erro ao salvar, mas vai sair mesmo");
    }

    location.reload();
};
//próxima fase
document.getElementById('proximo').onclick = () => {
    faseAtual++;

    if (faseAtual >= fases.length) {
        fimDeJogo();
        return;
    }

    palavrasEncontradas = 0;
    selecionadas = [];

    fim.classList.add('hidden');
    jogo.classList.remove('hidden');

    criarGrid();
};

//fim do jogo
async function fimDeJogo() {
    try {
        await salvarPontuacao();
    } catch (e) {
        console.log("erro ao salvar no fim");
    }

    //esconder todas as telas
    menu.classList.add('hidden');
    jogo.classList.add('hidden');
    fim.classList.add('hidden');

    const final = document.getElementById('final');
    final.classList.remove('hidden');

    document.getElementById('mensagemFinal').textContent =
        `${nomeJogador}, sua pontuação foi: ${pontos}`;
    
    //desabilita botão temporariamente
    const btnReiniciar = document.getElementById('reiniciar');
    btnReiniciar.disabled = true;

    //libera após 10 segundos
    setTimeout(() => {
        btnReiniciar.disabled = false;
    }, 10000);
}


//botao reiniciar
document.getElementById('reiniciar').onclick = () => {
    location.reload();
};

//menu
const menuIcon = document.querySelector('.menu-icon');
const menuDrop = document.getElementById('menuDrop');

menuIcon.onclick = () => {
    menuDrop.classList.toggle('hidden');
};

function iniciarJogo() {
    criarGrid();
}

function criarGrid() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';

    let matriz = Array(10).fill().map(() => Array(10).fill(''));

    //colocar palavras
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

    //preencher restante
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
// selecionar letra
function selecionar(div) {
    if (div.classList.contains('selecionada')) return;

    div.classList.add('selecionada');
    selecionadas.push(div);

    verificarPalavra();
}

function verificarPalavra() {
    if (selecionadas.length < 2) return;

    const linhas = selecionadas.map(l => parseInt(l.dataset.linha));
    const mesmaLinha = linhas.every(l => l === linhas[0]);

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

        document.querySelectorAll('.palavra-box').forEach(span => {
            if (span.textContent === tentativa) {
                span.classList.add('encontrada');
            }
        });

        selecionadas = [];

        if (palavrasEncontradas === 5) {
            if (faseAtual >= fases.length - 1) {
                fimDeJogo();
            } else {
                finalizarFase();
            }
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

//palavras e temas
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

//ui
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

function finalizarFase() {
    if (faseAtual >= fases.length - 1) {
        fimDeJogo();
        return;
    }
    jogo.classList.add('hidden');
    fim.classList.remove('hidden');
}

//backend
async function salvarPontuacao() {
    const resposta = await fetch('http://localhost:3000/salvar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nome: nomeJogador,
            pontos: pontos
        })
    });

    if (!resposta.ok) {
        throw new Error("Erro ao salvar");
    }
    console.log("resposta: ", resposta.status);
}

async function carregarRanking() {
    try {
        const resposta = await fetch('http://localhost:3000/top10');
        const dados = await resposta.json();

        const div = document.getElementById('ranking');
        div.innerHTML = '';

        dados.forEach(j => {
            const p = document.createElement('p');
            p.textContent = `${j.nome} - ${j.pontos}`;
            div.appendChild(p);
        });

    } catch (erro) {
        console.log("Erro ao carregar ranking");
    }
}