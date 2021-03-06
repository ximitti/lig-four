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
  disc.classList.add("disco", classe);
  coluna.appendChild(disc);
  disc.style.transform = `translatey(-${disc.offsetTop - coluna.offsetTop}px)`;
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
        createDisc(coluna, output, color);
        break;
      case "2":
        createDisc(coluna, output, color);
        break;
      case "3":
        createDisc(coluna, output, color);
        break;
      case "4":
        createDisc(coluna, output, color);
        break;
      case "5":
        createDisc(coluna, output, color);
        break;
      case "6":
        createDisc(coluna, output, color);
        break;
      case "7":
        createDisc(coluna, output, color);
        break;
      default:
    }
  }
  return output;
};

const onClick = (evento) => {
  // pega a coluna que foi clicada para incluir os disco
  const coluna = document.getElementById(evento.target.id);
  let celula = 0;

  // adiciona disco
  if (player === player1) {
    celula = addDisc(coluna, "red");
    if (celula > 0) {
      activePlayer(player, false);
      redPlayer.push(celula);
      jogadas.push(celula);
      player = player2;
      activePlayer(player, true);
      if (checkWinner(redPlayer)) {
        modal("Vermelho Vencedor");
      }
    }
  } else {
    celula = addDisc(coluna, "black");
    if (celula > 0) {
      activePlayer(player, false);
      blackPlayer.push(celula);
      jogadas.push(celula);
      player = player1;
      activePlayer(player, true);
      if (checkWinner(blackPlayer)) {
        modal("Preto Vencedor");
      }
    }
  }

  // checa se todas as casas foram preenchidas
  if (jogadas.length === 42) {
    modal("Empate!");
  }
};

const reset = () => {
  location.reload();
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

const activePlayer = (player, active) => {
  if (active) {
    player.firstElementChild.style.boxShadow = "0px 0px 5px 2px #888";
  } else {
    player.firstElementChild.style.boxShadow = "none";
  }
};

const modal = (txt) => {
  document.getElementById("id01").style.display = "block";
  document.getElementById("result").innerHTML = txt;
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
activePlayer(player, true);
start();
