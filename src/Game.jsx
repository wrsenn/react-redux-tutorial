import React from 'react';
import StatefulBoard from './StatefulBoard';
import calculateWinner from './calculateWinner';
import { newStep, revertToStep } from './actions';

class Game extends React.Component {
  getCurrentSquares() {
    const { history, stepNumber } = this.props;
    return history[stepNumber];
  }

  getNextMark() {
    const { xIsNext } = this.props;
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
    const { history } = this.props;
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
    const { dispatch } = this.props;
    dispatch(revertToStep(step));
  }

  handleClick(i) {
    const { dispatch } = this.props;
    const squares = this.getCurrentSquares();

    // Return early if someone has won or if Square is already filled
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    dispatch(newStep(this.getNextMark(), i));
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <StatefulBoard onClick={i => this.handleClick(i)} />
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
