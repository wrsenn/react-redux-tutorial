import { combineReducers } from 'redux';
import { NEW_STEP, REVERT_TO_STEP } from './actions';

export const initialState = {
  steps: {
    history: [
      {
        squares: Array(9).fill(null)
      }
    ],
    stepNumber: 0,
    xIsNext: true
  }
};

function getNextMark(xIsNext) {
  return xIsNext ? 'X' : 'O';
}

function steps(state = initialState, action) {
  switch (action.type) {
    case NEW_STEP: {
      const currentSquares = state.history.slice(-1).pop();
      currentSquares[action.cell] = getNextMark(state.xIsNext);
      return {
        history: [...state.history, { squares: currentSquares }],
        stepNumber: state.history.length,
        xIsNext: !state.xIsNext
      };
    }
    case REVERT_TO_STEP:
      return {
        history: state.history.slice(0, action.stepNumber + 1),
        stepNumber: action.stepNumber,
        xIsNext: action.stepNumber % 2 === 0
      };
    default:
      return state;
  }
}

export const ticTacToeApp = combineReducers(steps);
