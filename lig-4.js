const checkWinner = (arr) => {
  // impossível vitória com menos de 4 jogadas
  if (arr.length < 4) {
    return false;
  }

  let count = 0;
  // checa eixo X
  for (let i = 0; i < eixoX.length; i++) {
    count = 0;
    for (let j = 0; j < eixoX[i].length; j++) {
      if (arr.includes(eixoX[i][j])) {
        count++;
      }
    }
    if (count === 4) {
      return true;
    }
  }

  // checa eixo Y
  for (let i = 0; i < eixoY.length; i++) {
    count = 0;
    for (let j = 0; j < eixoY[i].length; j++) {
      if (arr.includes(eixoY[i][j])) {
        count++;
      }
    }
    if (count === 4) {
      return true;
    }
  }

  // checa diagonal esquerda-direita
  for (let i = 0; i < diagEsqDir.length; i++) {
    count = 0;
    for (let j = 0; j < diagEsqDir[i].length; j++) {
      if (arr.includes(diagEsqDir[i][j])) {
        count++;
      }
    }
    if (count === 4) {
      return true;
    }
  }

  // checa diagonal direita-esquerda
  for (let i = 0; i < diagDirEsq.length; i++) {
    count = 0;
    for (let j = 0; j < diagDirEsq[i].length; j++) {
      if (arr.includes(diagDirEsq[i][j])) {
        count++;
      }
    }
    if (count === 4) {
      return true;
    }
  }

  return false;
};

const createDisc = (coluna, id, classe) => {
  const disc = document.createElement("div");
  disc.setAttribute("id", id);
  disc.setAttribute("class", classe);
  coluna.appendChild(disc);
};

const addDisc = (coluna, color) => {
  let output = 0;
  // não pode ter mais de 6 discos
  if (coluna.childElementCount < 6) {
    if (coluna.childElementCount === 0) {
      output = Number(coluna.dataset.num);
    } else {
      output = Number(coluna.lastChild.id) + 7;
    }

    // recebe a coluna e adiciona o filho
    switch (coluna.dataset.num) {
      case "1":
        createDisc(coluna, output, `linha ${color}`);
        break;
      case "2":
        createDisc(coluna, output, `linha ${color}`);
        break;
      case "3":
        createDisc(coluna, output, `linha ${color}`);
        break;
      case "4":
        createDisc(coluna, output, `linha ${color}`);
        break;
      case "5":
        createDisc(coluna, output, `linha ${color}`);
        break;
      case "6":
        createDisc(coluna, output, `linha ${color}`);
        break;
      case "7":
        createDisc(coluna, output, `linha ${color}`);
        break;
      default:
    }
  }
  return output;
};

const onClick = (evento) => {
  // pega a coluna que foi clicada para incluir os disco
  const coluna = document.getElementById(evento.target.id);

  // adiciona disco
  if (player === player1) {
    // style background-color igual red
    let celula = addDisc(coluna, "red");
    redPlayer.push(celula);
    jogadas.push(celula);
    if (checkWinner(redPlayer)) {
      console.log("Vermelho vencedor");
    }
    player = player2;
  } else {
    let celula = addDisc(coluna, "black");
    blackPlayer.push(celula);
    jogadas.push(celula);
    if (checkWinner(blackPlayer)) {
      console.log("Preto vencedor");
    }
    player = player1;
  }

  // checa se todas as casas foram preenchidas
  if (jogadas.length === 42) {
    console.log("Empate!");
    reset();
  }
};

const reset = () => {
  tabuleiro.innerHTML = "";
  redPlayer = [];
  blackPlayer = [];
  jogadas = [];
  player = player1;
  start();
};

const start = () => {
  //criar tabuleiro
  for (let i = 1; i <= 7; i++) {
    let coluna = document.createElement("div");
    coluna.setAttribute("id", `col${i}`);
    coluna.setAttribute("class", "col");
    coluna.setAttribute("data-num", i);
    tabuleiro.appendChild(coluna);
  }
};

// Inicialização do jogo
// objetos globais
let redPlayer = [];
let blackPlayer = [];
let jogadas = [];
let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");
let player = player1;

// busca tabuleiro e inicia captura do evento
const tabuleiro = document.getElementById("container");
tabuleiro.addEventListener("click", onClick);
start();
