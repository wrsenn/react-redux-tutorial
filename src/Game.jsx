import React from 'react';
import Board from './Board';
import calculateWinner from './calculateWinner';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      xIsNext: true,
      stepNumber: 0
    };
  }

  getHistory() {
    const { history, stepNumber } = this.state;
    return history.slice(0, stepNumber + 1);
  }

  getCurrentSquares() {
    const { stepNumber } = this.state;
    const history = this.getHistory();
    const current = history[stepNumber];
    return current.squares.slice();
  }

  getNextMark() {
    const { xIsNext } = this.state;
    return xIsNext ? 'X' : 'O';
  }

  getStatus() {
    const squares = this.getCurrentSquares();
    const winner = calculateWinner(squares);
    if (winner) {
      return `Winner: ${winner}`;
    }
    return `Next player: ${this.getNextMark()}`;
  }

  getMoves() {
    const history = this.getHistory();
    return history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : 'Go to game start';
      return (
        <li key={move}>
          <button type="button" onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  handleClick(i) {
    const { xIsNext } = this.state;
    const history = this.getHistory();
    const squares = this.getCurrentSquares();

    // Return early if someone has won or if Square is already filled
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const squaresCopy = squares.slice();
    squaresCopy[i] = this.getNextMark();
    this.setState({
      history: history.concat([
        {
          squares: squaresCopy
        }
      ]),
      xIsNext: !xIsNext,
      stepNumber: history.length
    });
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.getCurrentSquares()}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{this.getStatus()}</div>
          <ol>{this.getMoves()}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
