# Caça-Palavras

Bem-vindo ao Caça-Palavras com ranking mais simples do século XXI!

---

## Sobre o projeto

Este projeto é um jogo de caça-palavras que permite ao usuário interagir diretamente no navegador, encontrar palavras e acumular pontos. Ao final da partida, a pontuação é enviada para um backend local, que armazena os dados em um banco SQLite e mantém um ranking dos melhores jogadores.

---

## Tecnologias utilizadas

- Frontend: HTML, CSS e JavaScript  
- Backend: Node.js com Express  
- Banco de dados: SQLite  
- Comunicação: API REST com JSON  

---

## Pré-requisitos

Antes de executar o projeto, você precisa ter instalado:

- Node.js (versão 14 ou superior)
- npm (gerenciador de pacotes)

Verifique com:

node -v
npm -v

---

## Como baixar o projeto

git clone https://github.com/polvologico945/caca-palavras
cd caca-palavras

---

## Instalação das dependências

npm install

---

## Como executar o backend

node src/config/server/server.js

Se tudo estiver correto, o backend será iniciado e ficará disponível em:

http://localhost:3000

---

## Como executar o frontend

Opção 1:  
Abra o arquivo index.html diretamente no navegador.

Opção 2 (recomendado):  
Utilize a extensão Live Server no VS Code:

1. Instale a extensão Live Server  
2. Clique com o botão direito no index.html  
3. Clique em "Open with Live Server"

---

## Endpoints da API

POST /salvar  
Descrição: salva o nome do jogador e sua pontuação  

Exemplo de body:

{
  "nome": "João",
  "pontuacao": 120
}

---

GET /top10  
Descrição: retorna os 10 melhores jogadores  

Exemplo de resposta:

[
  { "nome": "João", "pontuacao": 120 },
  { "nome": "Maria", "pontuacao": 100 }
]

---

## Estrutura do projeto

caca-palavras/
├── index.html
├── script.js
├── style.css
├── package.json
├── package-lock.json
├── ranking.db
├── README.md
├── src/
│   ├── app/
│   │   ├── controllers/
│   │   │    └── RankingController.js
│   │   ├── repositories/
│   │   │    └── RankingRepository.js
│   │   ├── routes.js
│   │   └── app.js
│   │
│   ├── config/
│   │   ├── database/
│   │   │    └── connection.js
│   │   └── server/
│   │        └── server.js

---

## Observações

- O banco SQLite é criado automaticamente ao iniciar o servidor  
- Certifique-se de que a porta 3000 esteja livre  
- O frontend precisa estar conectado ao backend para salvar e listar rankings corretamente  

## Autor

Projeto desenvolvido para fins de teste e como parte de portfólio profissional por Carla Evelyn.