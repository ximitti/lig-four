// objetos globais
const onClick = (evento) => {
    // pega a coluna que foi clicada para incluir os disco
    const coluna = document.getElementById(evento.target.id);
}
// Inicialização
const tabuleiro = document.getElementById("container");

tabuleiro.addEventListener("click", onClick);
