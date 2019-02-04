import { createStore } from 'redux';
import { initialState, ticTacToeApp } from './reducers';
import { newStep, revertToStep } from './actions';

const store = createStore(ticTacToeApp, initialState);

console.log(store.getState());

const unsubscribe = store.subscribe(() => console.log(store.getState()));

store.dispatch(newStep('X', 0));
store.dispatch(newStep('O', 1));
store.dispatch(newStep('X', 2));
store.dispatch(revertToStep(1));

unsubscribe();
