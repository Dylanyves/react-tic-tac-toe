import './App.css';
import Square from './components/Square'
import {useState, useEffect} from 'react'

function App() {
  const [board, setBoard] = useState(Array(9).fill(''))
  const [player, setPlayer] = useState('X')
  const [result, setResult] = useState({winner: '', status:''})

  useEffect(() => {
    if (result.status !== ''){
      alert(`Game winner: ${result.winner}`)
      setBoard(Array(9).fill(''))
      setPlayer('X')
      setResult({winner: '', status:''})
    } 
  }, [result])

  const checkWin = () => {
    const combos = {
      horizontal : [[0,1,2], [3,4,5], [6,7,8]],
      vertical : [[0,3,6], [1,4,7], [2,5,8]],
      diagonal: [[0,4,8], [2,4,6]]
    }
    for (let combo in combos){
      combos[combo].forEach(pattern => {
        if (board[pattern[0]] === '' || board[pattern[1]] === '' || board[pattern[2]] === ''){
          // Do nothing
        }
        else if (board[pattern[0]] === board[pattern[1]] && board[pattern[1]] === board[pattern[2]]){
          setResult({winner: board[pattern[0]], status: 'Win'})
        }
      })
    }
  }

  const checkTie = () => {
    let filled = true
    board.forEach(square => {
      if (square === ''){
        filled = false
      }
    })
    if (filled && result.status === ''){
      setResult({winner: 'No one', status:'Tie'})
    }
  }

  useEffect(() => {
    checkWin()
    checkTie()
  }, [board])

  const chooseSquare = (square) => {
    if (board[square] === ''){
      setBoard(
        board.map((value, index) => {
          if (index === square){
            return player
          }
          return value
        })
      )

      if (player === 'X'){
        setPlayer('O')
      } else{
        setPlayer('X')
      }
    } 

    else{
      alert("Nope, you can't click on that")
    }
  }

  return (
    <div className="App">
      <div className="board">
        <div className="row">
          <Square val={board[0]} chooseSquare={() => chooseSquare(0)}/>
          <Square val={board[1]} chooseSquare={() => chooseSquare(1)}/>
          <Square val={board[2]} chooseSquare={() => chooseSquare(2)}/>
        </div>
        <div className="row">
          <Square val={board[3]} chooseSquare={() => chooseSquare(3)}/>
          <Square val={board[4]} chooseSquare={() => chooseSquare(4)}/>
          <Square val={board[5]} chooseSquare={() => chooseSquare(5)}/>
        </div>
        <div className="row">
          <Square val={board[6]} chooseSquare={() => chooseSquare(6)}/>
          <Square val={board[7]} chooseSquare={() => chooseSquare(7)}/>
          <Square val={board[8]} chooseSquare={() => chooseSquare(8)}/>
        </div>
      </div>
    </div>
  );
}

export default App;
