// Variáveis globais úteis
const boardRegions = document.querySelectorAll('#gameBoard span');
let vBoard = []
let turnPlayer = '';
let scorePlayer1 = 0;
let scorePlayer2 = 0;

document.getElementById('player1Name').innerText = 'Jogador 1';
document.getElementById('player2Name').innerText = 'Jogador 2';

function updateTitle() {
  const playerInput = document.getElementById(turnPlayer);
  document.getElementById('turnPlayer').innerText = playerInput.value;

  const playerName1 = document.getElementById('player1');
  const playerName2 = document.getElementById('player2');
  document.getElementById('player1Name').innerText = playerName1.value;
  document.getElementById('player2Name').innerText = playerName2.value;
}

function initializeGame() {
  // Inicializa as variáveis globais
  vBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]
  turnPlayer = 'player1'
  // Ajusta o título da página (caso seja necessário)
  document.querySelector('h2').innerHTML =
    'Vez de: <span id="turnPlayer"></span>'
  updateTitle()
  // Limpa o tabuleiro (caso seja necessário) e adiciona os eventos de clique
  boardRegions.forEach(function (element) {
    element.classList.remove('win')
    element.innerText = ''
    element.classList.add('cursor-pointer')
    element.addEventListener('click', handleBoardClick)
  })
}

function getWinRegions() {
  const winRegions = []
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[0][1] &&
    vBoard[0][0] === vBoard[0][2]
  )
    winRegions.push('0.0', '0.1', '0.2')
  if (
    vBoard[1][0] &&
    vBoard[1][0] === vBoard[1][1] &&
    vBoard[1][0] === vBoard[1][2]
  )
    winRegions.push('1.0', '1.1', '1.2')
  if (
    vBoard[2][0] &&
    vBoard[2][0] === vBoard[2][1] &&
    vBoard[2][0] === vBoard[2][2]
  )
    winRegions.push('2.0', '2.1', '2.2')
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[1][0] &&
    vBoard[0][0] === vBoard[2][0]
  )
    winRegions.push('0.0', '1.0', '2.0')
  if (
    vBoard[0][1] &&
    vBoard[0][1] === vBoard[1][1] &&
    vBoard[0][1] === vBoard[2][1]
  )
    winRegions.push('0.1', '1.1', '2.1')
  if (
    vBoard[0][2] &&
    vBoard[0][2] === vBoard[1][2] &&
    vBoard[0][2] === vBoard[2][2]
  )
    winRegions.push('0.2', '1.2', '2.2')
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[1][1] &&
    vBoard[0][0] === vBoard[2][2]
  )
    winRegions.push('0.0', '1.1', '2.2')
  if (
    vBoard[0][2] &&
    vBoard[0][2] === vBoard[1][1] &&
    vBoard[0][2] === vBoard[2][0]
  )
    winRegions.push('0.2', '1.1', '2.0')
  return winRegions
}
function disableRegion(element) {
  element.style.cursor = 'default'
  element.removeEventListener('click', handleBoardClick)
}
function handleWin(regions) {
  regions.forEach(function (region) {
    document.querySelector('[data-region="' + region + '"]').classList.add('win')
  })
  const playerName = document.getElementById(turnPlayer).value
  document.querySelector('h2').innerHTML = playerName + ' venceu!'
  if (turnPlayer == "player1"){
    scorePlayer1++;
  }

  if (turnPlayer == "player2"){
    scorePlayer2++;
  }

  console.log("Player 1 SCORE: " + scorePlayer1);
  console.log("Player 2 SCORE: " + scorePlayer2);

  document.getElementById("scorePlayer1").innerHTML = scorePlayer1;
  document.getElementById("scorePlayer2").innerHTML = scorePlayer2;
  
}
function handleBoardClick(ev) {
  // Obtém os índices da região clicada
  const span = ev.currentTarget
  const region = span.dataset.region // N.N
  const rowColumnPair = region.split('.') // ["N", "N"]
  const row = rowColumnPair[0]
  const column = rowColumnPair[1]
  // Marca a região clicada com o símbolo do jogador
  if (turnPlayer === 'player1') {
    span.innerText = 'X'
    vBoard[row][column] = 'X'
  } else {
    span.innerText = 'O'
    vBoard[row][column] = 'O'
  }
  // Limpa o console e exibe nosso tabuleiro virtual
  console.clear()
  console.table(vBoard)
  disableRegion(span)

  const winRegions = getWinRegions()
  if(winRegions.length >0){
    handleWin(winRegions)
  }else if(vBoard.flat().includes('')){
    turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1'
    updateTitle()
  }else{
    document.querySelector('h2').innerHTML='Empate!'
  }


}
// Adiciona o evento no botão que inicia o jogo
document.getElementById('start').addEventListener('click', initializeGame)
