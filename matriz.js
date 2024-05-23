/*var button, quebra_linha, jogada = 1, vencedor=0
var tabuleiro = new Array(3)
    for(var i = 0; i< tabuleiro.length; i ++){
        tabuleiro[i] = new Array(3)
}
    for(var i = 0; i< tabuleiro.length; i ++){
        quebra_linha = document.createElement("br")
        document.body.append(quebra_linha)
        for(var j = 0; j< tabuleiro[i].length;j++){
            button = document.createElement("button")
            button.setAttribute("type", "button")
            button.setAttribute("id", "bt"+i+""+j)
            button.setAttribute("class", "btJogo" +i)
            button.setAttribute("onclick", "marca(" +i+',' +j+ ')')
            button.append(document.createTextNode(""))
            document.body.append(button)
        }            
}
    function marcaCasa(nomeBotao){
        if(jogada % 2 == 0){
            document.getElementById(nomeBotao).innerText = "O"
           document.getElementById(nomeBotao).style.color = "red"
        }else{ document.getElementById(nomeBotao).innerText = "X"
        document.getElementById(nomeBotao).style.color = "black"
        }
        document.getElementById(nomeBotao).disabled = true
        let line= nomeBotao.charAt(2)
        let column= nomeBotao.charAt(3)
        alert(line+""+column)
        jogada ++
        if(jogada >= 5){
            encerrarjogo()
        }
        if(jogada > 9){
            alert("Deu velha, sua troxa!!")
        }
    }
    function marca(linha, coluna){
        marcaCasa("bt"+linha+""+coluna)
    }
    function encerrarjogo(){
        if(document.getElementById("bt00").innerText  == document.getElementById("bt01").innerText
        && document.getElementById("bt01").innerText  == document.getElementById("bt02").innerText
        && document.getElementById("bt00").innerText  != ""){
            alert("Jogo finalizado!\nVencedor: "+ document.getElementById("bt00").innerText)
            vencedor++
        }
        if(document.getElementById("bt10").innerText  == document.getElementById("bt11").innerText
        && document.getElementById("bt11").innerText  == document.getElementById("bt12").innerText
        && document.getElementById("bt10").innerText  != ""){
            alert("Jogo finalizado!\nVencedor: "+ document.getElementById("bt10").innerText)
            vencedor++
        }
        if(document.getElementById("bt20").innerText  == document.getElementById("bt21").innerText
        && document.getElementById("bt21").innerText  == document.getElementById("bt22").innerText
        && document.getElementById("bt20").innerText  != ""){
            alert("Jogo finalizado!\nVencedor: "+ document.getElementById("bt20").innerText)
            vencedor++
        }
        if(document.getElementById("bt00").innerText  == document.getElementById("bt10").innerText
        && document.getElementById("bt10").innerText  == document.getElementById("bt20").innerText
        && document.getElementById("bt00").innerText  != ""){
            alert("Jogo finalizado!\nVencedor: "+ document.getElementById("bt00").innerText)
            vencedor++
        }
        if(document.getElementById("bt01").innerText  == document.getElementById("bt11").innerText
        && document.getElementById("bt11").innerText  == document.getElementById("bt21").innerText
        && document.getElementById("bt01").innerText  != ""){
            alert("Jogo finalizado!\nVencedor: "+ document.getElementById("bt01").innerText)
            vencedor++
        }
        if(document.getElementById("bt02").innerText  == document.getElementById("bt12").innerText
        && document.getElementById("bt12").innerText  == document.getElementById("bt22").innerText
        && document.getElementById("bt02").innerText  != ""){
            alert("Jogo finalizado!\nVencedor: "+ document.getElementById("bt02").innerText)
            vencedor++
        }
        if(document.getElementById("bt00").innerText  == document.getElementById("bt11").innerText
        && document.getElementById("bt11").innerText  == document.getElementById("bt22").innerText
        && document.getElementById("bt00").innerText  != ""){
            alert("Jogo finalizado!\nVencedor: "+ document.getElementById("bt00").innerText)
            vencedor++
        }
        if(document.getElementById("bt02").innerText  == document.getElementById("bt11").innerText
        && document.getElementById("bt11").innerText  == document.getElementById("bt20").innerText
        && document.getElementById("bt02").innerText  != ""){
            alert("Jogo finalizado!\nVencedor: "+ document.getElementById("bt02").innerText)
            vencedor++
        }
    }
    */
    const boardSize = 3;  // Constant for board dimensions
    let board = Array(boardSize).fill(null);  // Initialize board with null values
    let currentPlayer = 'X';  // Start with player X
    let gameOver = false;
    
    function createGameBoard() {
      const gameContainer = document.createElement('div');
      gameContainer.classList.add('game-container');
    
      for (let i = 0; i < boardSize; i++) {
        const row = document.createElement('div');
        row.classList.add('game-row');
    
        for (let j = 0; j < boardSize; j++) {
          const button = document.createElement('button');
          button.classList.add('game-button');
          button.dataset.cellIndex = i;  // Use dataset for cell coordinates
          button.dataset.columnIndex = j;
          button.addEventListener('click', handleCellClick);
          row.appendChild(button);
        }
    
        gameContainer.appendChild(row);
      }
    
      document.body.appendChild(gameContainer);
    }
    
    function handleCellClick(event) {
      const cellIndex = parseInt(event.target.dataset.cellIndex, 10);
      const columnIndex = parseInt(event.target.dataset.columnIndex, 10);
    
      if (gameOver || board[cellIndex][columnIndex] !== null) {
        return;  // Prevent clicks on occupied cells or after game over
      }
    
      board[cellIndex][columnIndex] = currentPlayer;
      event.target.textContent = currentPlayer;
      event.target.disabled = true;
    
      checkWinner();
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';  // Switch players
    }
    
    function checkWinner() {
      // Check rows, columns, and diagonals for winning combinations
      for (let i = 0; i < boardSize; i++) {
        if (board[i].every(cell => cell === currentPlayer)) {
          declareWinner(currentPlayer);
          return;
        }
    
        if (board.every(row => row[i] === currentPlayer)) {
          declareWinner(currentPlayer);
          return;
        }
      }
    
      const diagonals = [
        [board[0][0], board[1][1], board[2][2]],
        [board[0][2], board[1][1], board[2][0]]
      ];
    
      for (const diagonal of diagonals) {
        if (diagonal.every(cell => cell === currentPlayer)) {
          declareWinner(currentPlayer);
          return;
        }
      }
    
      // Check for a tie (all cells filled)
      if (board.every(row => row.every(cell => cell !== null))) {
        declareWinner('tie');
      }
    }
    
    function declareWinner(winner) {
      gameOver = true;
      // Display winner or tie message (implementation details omitted)
    }
    
    createGameBoard();