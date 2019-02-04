import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { initialState, ticTacToeApp } from './reducers';
import StatefulGame from './StatefulGame';
import './index.css';

const store = createStore(ticTacToeApp, initialState);

render(
  <Provider store={store}>
    <StatefulGame />
  </Provider>,
  document.getElementById('root')
);
